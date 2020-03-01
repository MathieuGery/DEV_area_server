const superagent = require('superagent');
var SpotifyWebApi = require('spotify-web-api-node');
var spotifyApi = new SpotifyWebApi({
    clientId: '75756b707cb74a24b4aa3837611a964e',
    clientSecret: 'bada35ae050145db93ac41cbbfda9bfb',
    redirectUri: 'http://localhost:5000/api/services/spotify/test'
});

function isConnectedToSpotify(user) {
    return !!user.access_token_list.id.find('spotify');

}

function spotifyapi(token) {
    spotifyApi.setAccessToken();
    spotifyApi.followPlaylist('5ieJqeLJjjI8iJWaxeBLuK',
        {
            'public' : false
        }).then(function(data) {
        console.log('Playlist successfully followed privately!');
    }, function(err) {
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
