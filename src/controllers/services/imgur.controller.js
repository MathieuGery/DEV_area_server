const superagent = require('superagent');
const url = "https://api.imgur.com/";
const axios = require('axios');

exports.status = async function get_status_imgur(req, res) {
    if (!user.access_token_list.find(el => el.id === 'imgur')) {
        return res.status(400).json({text: 'not connected to the service'});
    }
    return res.status(200).json({text: 'succed user connected'});
};

exports.postImg = function postImg(doc, reactionParams, par) {
    let access_token = doc.access_token_list.find(el => el.id === 'imgur').access_token;
    superagent.post(`${url}3/upload`)
        .type('form')
        .field({image: reactionParams})
        .set({Authorization: 'Bearer ' + access_token, image: reactionParams})
        .end((err, resp) => {
            if (err) {
                console.log("err", resp.body);
            }
            console.log(resp.body);
        });
};

exports.changeBio = function changeBio(doc, reactionParams, par) {
    let bio = ''
    if (!reactionParams[0])
        bioMessage = 'I have uploaded ' + doc.data.nbPostImgImgur + ' images thanks to bossarea'
    else
        bioMessage = reactionParams[0]
    console.log(bioMessage)
    let username = doc.access_token_list.find(el => el.id === 'imgur').username;
    let access_token = doc.access_token_list.find(el => el.id === 'imgur').access_token;
    superagent.put(`${url}3/account/` + username + '/settings')
        .send({bio: bioMessage})
        .set({Authorization: 'Bearer ' + access_token})
        .end((err, resp) => {
            if (err) {
                console.log(resp.body);
            }
            console.log(resp.body);
        });
};

exports.checkImgurNewPost = function checkImgurNewPost(doc, actionParams) {
    let username = doc.access_token_list.find(el => el.id === 'imgur').username;
    let access_token = doc.access_token_list.find(el => el.id === 'imgur').access_token;
    let config = {};
    let header = {};

    header['Authorization'] = 'Bearer ' + access_token;
    config['headers'] = header;
    config['method'] = 'GET';
    config['url'] = `${url}3/account/` + username + '/images/count';

    return axios(config).then((res) => {
        console.log(doc.data.nbPostImgImgur);
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
