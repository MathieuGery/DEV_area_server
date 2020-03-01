const superagent = require('superagent');
const axios = require('axios');
const url = "https://api.imgur.com/";

function getIntraAlerts(user) {
    console.log(`${burl}` + user);
    superagent.get(`${burl}` + user + '/user/notification/message')
        .query({format: 'json'})
        .end((err, resp) => {
            if (err) {
                console.log(resp.body);
            }
            console.log(resp.body);
        });
}

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
    }, 1500);
    return res.status(200).json({text: 'corectly set trigger'});
};



function set_user_posts_number(username, access_token) {
    let header = {};
    let nb_images = 0;

    header['Authorization'] = 'Bearer ' + access_token;
    header['Access-Control-Allow-Origin'] = '*';

    //AVOIR L'ACCESS TOKEN D'IMGUR DE L'USER
        //if (user.access.token.list.id == 'imgur')
        // access_token = user.access.tokent.list.access_token

    superagent.get(`${url}3/account/` + username + '/images/count')
        .set({Authorization: 'Bearer ' + access_token})
        .end((err, resp) => {
            if (err) {
                console.log(resp.body);
            }
            console.log(resp.body);
            nb_images = resp.body.data;
            console.log(nb_images);
        });

}
