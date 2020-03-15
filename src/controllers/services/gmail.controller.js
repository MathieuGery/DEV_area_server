const config = require('../../config');
const apiToken = config.ytbApiToken;
const axios = require('axios');
const url = "https://www.googleapis.com/gmail/v1";

exports.checkNewMailRecv = function checkNewMailRecv(doc, actionParams) {
    let access_token = doc.access_token_list.find(el => el.id === 'gmail').access_token;
    let config = {};
    let header = {};

    header['Authorization'] = 'Bearer ' + access_token;
    config['headers'] = header;
    config['params'] = {key: apiToken};
    config['method'] = 'GET';
    config['url'] = `${url}/users/me/messages`;

    return axios(config).then((res) => {
        if (doc.data.lastMailId != res.data.messages[0].id) {
            doc.data.lastMailId = res.data.messages[0].id;
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

exports.checkNewMailRecvFromUser = function checkNewMailRecvFromUser(doc, actionParams) {
    let access_token = doc.access_token_list.find(el => el.id === 'gmail').access_token;
    let config = {};
    let header = {};

    header['Authorization'] = 'Bearer ' + access_token;
    config['headers'] = header;
    config['params'] = {key: apiToken, from: actionParams};
    config['method'] = 'GET';
    config['url'] = `${url}/users/me/messages`;

    return axios(config).then((res) => {
        if (doc.data.lastMailIdFromUser != res.data.messages[0].id) {
            doc.data.lastMailIdFromUser = res.data.messages[0].id;
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
