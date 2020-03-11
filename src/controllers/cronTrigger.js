const User = require('../models/user.model');
const imgurAPI = require('./services/imgur.controller');
const config = require('../config');

exports.activeTriggers = async function activeTriggers(req, res) {
    setInterval(function () {
        cronTrigger(req);
    }, config.interval);
    return res.status(200).json({text: 'corectly active routines'});
};

function cronTrigger(req) {
    User.findOne({email: req.user.email}, function (err, doc) {
            if (doc.access_token_list.find(el => el.id === 'imgur')) {
                if (doc.routines_list.find(el => el.actionService === 'imgur' && el.reactionService === 'imgur').active) {
                    if (doc.routines_list.find(el => el.actionTrigger === 'user_new_post' && el.reactionTrigger === 'new_post').active) {
                        imgurAPI.getImgImgurAndChangeBio(doc, req)
                    }
                }
            }
        }
    )
}
