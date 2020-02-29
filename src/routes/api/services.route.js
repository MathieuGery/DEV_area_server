'use strict';

const express = require('express');
const router = express.Router();
const auth = require('../../middlewares/authorization');
const intraRouter = require('./servicesRouters/intra.route');
const imgurRouter = require('./servicesRouters/imgur.route');

router.use('/intra', intraRouter);
router.use('/imgur', imgurRouter);

router.post('/setToken', auth(), (req, res) => {
    const q = req.query;
    console.log(q);
    if (!q.id || !q.access_token) {
        return res.status(400).json({
            text: "Missing parameters"
        });
    }
    try {
        let user = req.user;
        let access_token_elem = user.access_token_list.find(elem => elem.id === q.id);
        if (access_token_elem)
            access_token_elem.access_token = q.access_token;
        else
            user.access_token_list.push(q);
        user.save(function (err) {
            console.log(err)
        });
        let result = {
            status: 'succed',
        };
        return res.status(200).json(result);
    } catch (e) {
        return res.status(400).json({
            text: "Invalid request token"
        });
    }
});

module.exports = router;
