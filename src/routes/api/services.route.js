'use strict';

const express = require('express');
const router = express.Router();
const auth = require('../../middlewares/authorization');
const intraRouter = require('./servicesRouters/intra.route');
const imgurRouter = require('./servicesRouters/imgur.route');
const spotifyRouter = require('./servicesRouters/spotify.route');

router.use('/intra', intraRouter);
router.use('/imgur', imgurRouter);
router.use('/spotify', spotifyRouter);

router.get('/isauth', auth(), (req, res) => {
    const q = req.query;
    let user = req.user;

    if (!q.service) {
        return res.status(400).json({
            message: "Missing service ID parameter"
        });
    }
    try {
        let token = user.access_token_list.find(el => el.id === q.service).access_token;
        if (token) {
            let result = {
                message: 'success',
            };
            return res.status(200).json(result);
        }
    } catch (e) {
        let result = {
            message: 'not authenticate to ' + q.service,
        };
        return res.status(201).json(result);
    }
});

router.post('/setToken', auth(), (req, res) => {
    const q = req.query;
    if (!q.id || !q.access_token || !q.username) {
        return res.status(400).json({
            text: "Missing parameters"
        });
    }
    try {
        let user = req.user;
        let access_token_elem = user.access_token_list.find(elem => elem.id === q.id);
        if (access_token_elem) {
            access_token_elem.access_token = q.access_token;
            access_token_elem.username = q.username;
        } else
            user.access_token_list.push(q);
        user.save(function (err) {
            console.log("mabite", err)
        });
        let result = {
            status: 'success',
        };
        return res.status(200).json(result);
    } catch (e) {
        return res.status(400).json({
            text: "Invalid request token"
        });
    }
});

module.exports = router;
