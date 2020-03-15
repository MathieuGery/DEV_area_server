const config = require('../../config');
const axios = require('axios');
const url = config.ytbApiUrl;
const apiToken = config.ytbApiToken;

exports.checkLikedVids = function checkLikedVids(doc, actionParams) {
    let access_token = doc.access_token_list.find(el => el.id === 'youtube').access_token;
    console.log("access_token", access_token);
    let config = {};
    let header = {};
    header['Authorization'] = 'Bearer ' + access_token;
    config['headers'] = header;
    config['params'] = {myRating: 'like', key: apiToken, part: 'snippet'};
    config['method'] = 'GET';
    config['url'] = `${url}/videos`;

    return axios(config).then((res) => {
        if (doc.data.likedVids < res.data.pageInfo.totalResults) {
            doc.data.likedVids = res.data.pageInfo.totalResults;
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