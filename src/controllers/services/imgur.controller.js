const superagent = require('superagent');
const axios = require('axios');
const url = "https://api.imgur.com/";
const passport = require('passport');
const handleJWT = require('../../middlewares/authorization');
const User = require('../../models/user.model');

exports.status = async function get_status_imgur(req, res) {
    if (!user.access_token_list.find(el => el.id === 'imgur')) {
        return res.status(400).json({text: 'not connected to the service'});
    }
    return res.status(200).json({text: 'succed user connected'});
};

function changeBio(username, access_token, nb_images) {
    superagent.put(`${url}3/account/` + username + '/settings')
        .send({bio: 'I have uploaded' + nb_images + 'images thanks to bossarea'})
        .set({Authorization: 'Bearer ' + access_token})
        .end((err, resp) => {
            if (err) {
                console.log(resp.body);
            }
            console.log(resp.body);
        });
}

exports.getImgImgurAndChangeBio = function getImgImgurAndChangeBio(doc, req) {
    let header = {};
    let username = doc.access_token_list.find(el => el.id === 'imgur').username;
    let access_token = doc.access_token_list.find(el => el.id === 'imgur').access_token;
    header['Authorization'] = 'Bearer ' + access_token;
    header['Access-Control-Allow-Origin'] = '*';

    superagent.get(`${url}3/account/` + username + '/images/count')
        .set({Authorization: 'Bearer ' + access_token})
        .end((err, resp) => {
            if (err) {
                console.log(resp.body);
            }
            console.log(resp.body);
            console.log(doc.data.number_image_imgur);
            if (doc.data.number_image_imgur < resp.body.data) {
                req.user.data.number_image_imgur = resp.body.data;
                req.user.save(function (err) {
                    console.log(err)
                });
                changeBio(username, access_token, resp.body.data);
            }
        });
}
