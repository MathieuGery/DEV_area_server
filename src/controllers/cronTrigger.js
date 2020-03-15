const config = require('../config');
const User = require('../models/user.model');
const imgurAPI = require('./services/imgur.controller');
const ytbAPI = require('./services/youtube.controller');
const gmailAPI = require('./services/gmail.controller');
const spotifyAPI = require('./services/spotify.controller');

const actionDico = [
    {id: "imgur:user_new_post", value: imgurAPI.checkImgurNewPost},
    {id: "youtube:new_liked_video", value: ytbAPI.checkLikedVids},
    {id: "gmail:new_inbox_mail", value: gmailAPI.checkNewMailRecv},
    {id: "gmail:new_inbox_mail_from_user", value: gmailAPI.checkNewMailRecvFromUser}
];

const reactionDico = [
    {id: "imgur:change_bio", value: imgurAPI.changeBio},
    {id: "imgur:new_post", value: imgurAPI.postImg},
    {id: "spotify:follow_playlist", value: spotifyAPI.followPlaylist},
    {id: "spotify:follow_artist", value: spotifyAPI.followNewArtist}
];

exports.activeTriggers = async function activeTriggers(req, res) {
    setInterval(function () {
        cronTrigger(req);
    }, config.interval);
    return res.status(200).json({text: 'corectly active routines'});
};

function cronTrigger(req) {
    User.findOne({email: req.user.email}, function (err, doc) {
            doc.routines_list.forEach(routine => {
                if (routine.active) {
                    actionDico.find(el => el.id === routine.actionService + ':' + routine.actionTrigger).value(doc, routine.actionParams).then((res) => {
                        console.log(res);
                        if (res && res.status === true) {
                            reactionDico.find(el => el.id === routine.reactionService + ':' + routine.reactionTrigger).value(doc, routine.reactionParams, res)
                        }
                    });
                }
            })
        }
    )
}
