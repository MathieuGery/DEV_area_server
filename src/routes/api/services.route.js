'use strict';

const express = require('express');
const router = express.Router();
const intraRouter = require('./servicesRouters/intra.route');
const imgurRouter = require('./servicesRouters/imgur.route');

router.use('/intra', intraRouter);
router.use('/imgur', imgurRouter);
module.exports = router;
