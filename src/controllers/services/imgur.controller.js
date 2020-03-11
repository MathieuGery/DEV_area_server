const superagent = require('superagent');
const url = "https://api.imgur.com/";
const axios = require('axios');

exports.status = async function get_status_imgur(req, res) {
    if (!user.access_token_list.find(el => el.id === 'imgur')) {
        return res.status(400).json({text: 'not connected to the service'});
    }
    return res.status(200).json({text: 'succed user connected'});
};

function changeBio(username, access_token, nb_images) {
    superagent.put(`${url}3/account/` + username + '/settings')
        .send({bio: 'I have uploaded ' + nb_images + ' images thanks to bossarea'})
        .set({Authorization: 'Bearer ' + access_token})
        .end((err, resp) => {
            if (err) {
                console.log(resp.body);
            }
            console.log(resp.body);
        });
}

exports.checkImgurNewPost = function checkImgurNewPost(doc, actionParams) {
    let ret = {status: false};
    let username = doc.access_token_list.find(el => el.id === 'imgur').username;
    let access_token = doc.access_token_list.find(el => el.id === 'imgur').access_token;
    let config = {};
    let header = {};

    header['Authorization'] = 'Bearer ' + access_token;
    config['headers'] = header;
    config['method'] = 'GET';
    config['url'] = `${url}3/account/` + username + '/images/count';

    return axios(config).then((res) => {
        if (doc.data.nbPostImgImgur < res.data.data) {
            doc.data.nbPostImgImgur = res.data.data;
            doc.save(function (err) {
                console.log(err)
            });
            return {status: true};
        }
        return {status: false};
    }).catch((error) => {
        console.log(error.response)
    });
};
