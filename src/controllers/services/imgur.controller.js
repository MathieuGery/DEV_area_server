const superagent = require('superagent');
const axios = require('axios');
const url = "https://api.imgur.com/";
let nb_images = 10000;
let setnbimages = 0;

exports.status = async function get_status_imgur(req, res) {
    if (!user.access_token_list.find(el => el.id === 'imgur')) {
        return res.status(400).json({text: 'not connected to the service'});
    }
    return res.status(200).json({text: 'succed user connected'});
};

exports.getUserPosts = async function get_intra_alerts(req, res) {
    if (!req.user.access_token_list.find(el => el.id === 'imgur')) {
        return res.status(400).json({text: 'not connected to the service'});
    }
    console.log(req.user.access_token_list.find(el => el.id === 'imgur').access_token);
    setInterval(function () {
        set_user_posts_number(req.user.access_token_list.find(el => el.id === 'imgur').username, req.user.access_token_list.find(el => el.id === 'imgur').access_token);
    }, 5000);
    return res.status(200).json({text: 'corectly set trigger'});
};

function changeBio(username, access_token) {
    superagent.put(`${url}3/account/` + username + '/settings')
        .send({bio: 'I have uploaded a new image thanks to bossarea'})
        .set({Authorization: 'Bearer ' + access_token})
        .end((err, resp) => {
            if (err) {
                console.log(resp.body);
            }
            console.log(resp.body);
        });
}

function set_user_posts_number(username, access_token) {
    let header = {};

    header['Authorization'] = 'Bearer ' + access_token;
    header['Access-Control-Allow-Origin'] = '*';

    console.log(nb_images);
    superagent.get(`${url}3/account/` + username + '/images/count')
        .set({Authorization: 'Bearer ' + access_token})
        .end((err, resp) => {
            if (err) {
                console.log(resp.body);
            }
            if (setnbimages === 0) {
                nb_images = resp.body.data;
            }
            console.log(resp.body.data);
            if (nb_images < resp.body.data) {
                nb_images = resp.body.data;
                changeBio(username, access_token);
            }
        });

}
