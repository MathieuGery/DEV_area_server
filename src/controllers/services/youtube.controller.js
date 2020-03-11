const config = require('../../config');
const superagent = require('superagent');
const url = config.ytbApiUrl;
const apiToken = config.ytbApiToken;

expots.getLikedVids = function getLikedVids(doc, req) {
    let access_token = doc.access_token_list.find(el => el.id === 'youtube').access_token;
    superagent.put(`${url}/videos`)
        .send({myRating: 'like', key: apiToken, part: 'snippet'})
        .set({Authorization: 'Bearer ' + access_token})
        .end((err, resp) => {
            if (err) {
                console.log(resp.body);
            }
            console.log(resp.body.pageInfo.totalResults);
            console.log(doc.data.likedVids);
            if (doc.data.likedVids < resp.body.pageInfo.totalResults) {
                req.user.data.likedVids = resp.body.pageInfo.totalResults;
                doc.save(function (err) {
                    console.log(err)
                });
            }
        });
}