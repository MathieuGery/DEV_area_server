'use strict';

const express = require('express');
const router = express.Router();
const authRouter = require('./auth.route');
const routinesRouter = require('./routines.route');
const aboutjson = require('../../controllers/about.controller');

router.get('/status', (req, res) => {
    res.send({status: 'OK'})
}); // api status
router.get('/about.json', (req, res) => {
    try {
        const aboutFile = require('../../about.json');
        console.log(aboutFile)
        aboutFile.client.host = req.ip;
        if (aboutFile.client.host.substr(0, 7) === "::ffff:") {
            aboutFile.client.host = aboutFile.client.host.substr(7)
        }
        aboutFile.server.current_time = Date.now();
        return res.send(aboutFile);
    } catch (error) {
        return res.status(400).json({
            text: "Invalid request about.json not found"
        });
    }
});
router.use('/auth', authRouter); // mount auth paths
router.use('/routines', routinesRouter);
module.exports = router;
