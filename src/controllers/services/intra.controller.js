const superagent = require('superagent');
const burl = "https://intra.epitech.eu/";

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

exports.alerts = async function get_intra_alerts(req, res) {
    const q = req.query;
    if (!q.user) {
        return res.status(400).json({text: 'invalid auth token'});
    }
    setInterval(function () {
        getIntraAlerts(q.user);
    }, 1500);
    return res.status(200).json({text: 'succed'});
};
