const superagent = require('superagent');
const axios = require('axios');
var SpotifyWebApi = require('spotify-web-api-node');
var spotifyApi = new SpotifyWebApi({
    clientId: '75756b707cb74a24b4aa3837611a964e',
    clientSecret: 'bada35ae050145db93ac41cbbfda9bfb',
    redirectUri: 'http://localhost:5000/api/services/spotify/test'
});
var url = "https://api.spotify.com/";

//////////// GET USER CURRENTLY PLAYING TRACK


exports.getUserCurrentlyPlayingTrack = function getUserCurrentlyPlayingTrack(username, access_token) {
    var is_music_playing = true;

    axios(
        {
            method: 'GET',
            url: `${url}v1/me` + username + 'currently-playing',
            headers: {'Authorization': 'Bearer ' + access_token}
        }).then((response) => {
            console.log(response.status, response.data);
            is_music_playing = response.data.is_playing;
        })
        .catch((error) => {
            console.log(error.response);
        });
    return is_music_playing;
}






//////// FOLLOW A NEW ARTIST

function searchForTheArtist(artistName, access_token) {
    var artist_id = null;

    axios(
        {
            method: 'GET',
            url: `${url}v1/search`,
            headers: {'Authorization': 'Bearer ' + access_token},
            body: {'q' : artistName, 'type' : 'artist'},
        }).then((response) => {
            if (response.data.artists.items != null) {
                artist_id = response.data.artists.items[0].id;
            }
        console.log(response.status, response.data);
        })
        .catch((error) => {
            console.log(error.response);
        });
    return artist_id;
}

exports.followNewArtist = function followNewArtist(doc, reactionParams, par) {
    let access_token = doc.access_token_list.find(el => el.id === 'spotify').access_token;
    var artist_id = searchForTheArtist(reactionParams[0], access_token);

    if (artist_id === null) {
        return false;
    }
    axios(
        {
            method: 'PUT',
            url: `${url}v1/me/following`,
            headers: {'Authorization': 'Bearer ' + access_token},
            body: {'type' : 'artist', 'ids' : artist_id},
        }).then((response) => {
            console.log(response.status, response.data);
        })
        .catch((error) => {
            console.log(error.response);
        });
    return true;
}



///////// CREATE A NEW PLAYLIST AND ADD THE NEW TRACKS TO IT

function getUserId(username) {
    var user_id = '';

    axios(
        {
            method: 'GET',
            url: `${url}v1/me`,
            headers: {'Authorization': 'Bearer ' + access_token},
        }).then((response) => {
            user_id = response.data.id;
        })
        .catch((error) => {
            console.log(error.response);
        });

    return user_id;
}

function createPlaylist(playlist_name, username) {
    const iteration = {number : 0};

    if (iteration.number === 0) {
        var playlist_id = '';
        var user_id = getUserId(username);

        axios(
            {
                method: 'POST',
                url: `${url}v1/users/` + user_id + '/playlists',
                headers: {'Authorization': 'Bearer ' + access_token},
                body: {'name': playlist_name, 'description': 'This is my AREA playlist', 'public': true}
            }).then((response) => {
            playlist_id = response.data.id;
        })
            .catch((error) => {
                console.log(error.response);
            });
        iteration.number += 1;
        return playlist_id;
    }
}

function getMusicUri(music_name) {
    var music_id = '';

    axios(
        {
            method: 'GET',
            url: `${url}v1/search`,
            headers: {'Authorization': 'Bearer ' + access_token},
            body: {'q' : music_name, 'type' : 'track'},
        }).then((response) => {
            if (response.data.tracks.items != null) {
                music_id = response.data.tracks.items[0].uri;
            }
        })
        .catch((error) => {
            console.log(error.response);
        });

    return music_id;
}

function addMusicToPlaylist(username, music_name)
{
    var playlist_id = createPlaylist(username, 'bossarea playlist');
    var music_uri = getMusicUri(music_name);

    axios(
        {
            method: 'POST',
            url: `${url}v1/playlists/` + playlist_id + '/tracks',
            headers: {'Authorization': 'Bearer ' + access_token},
            body : {'uris' : music_uri}
        }).then((response) => {
            console.log(response.status, response.data);
        })
        .catch((error) => {
            console.log(error.response);
        });
}




////////////


function isConnectedToSpotify(user) {
    return !!user.access_token_list.id.find('spotify');

}

exports.followPlaylist = function followPlaylist(doc, reactionParams, par) {
    spotifyApi.setAccessToken(doc.access_token_list.find(el => el.id === 'spotify').access_token);
    spotifyApi.followPlaylist(reactionParams[0],
        {
            'public': false
        }).then(function (data) {
        console.log('Playlist successfully followed privately!');
    }, function (err) {
        console.log('Something went wrong!', err);
    });
}

exports.test = async function test(req, res) {
    return res.status(200).json({text: 'succed'});
};

exports.status = async function get_status_spotify(req, res) {
    if (!user.access_token_list.find(el => el.id === 'spotify')) {
        return res.status(400).json({text: 'not connected to the service'});
    }
    return res.status(200).json({text: 'succed user connected'});
};
