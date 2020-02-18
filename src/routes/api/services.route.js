'use strict';

const express = require('express');
const router = express.Router();
const authRouter = require('./auth.route');
const routinesRouter = require('./routines.route');
const intraRouter = require('./servicesRouters/intra.route')

router.use('/intra', intraRouter);
module.exports = router;
