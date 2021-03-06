'use strict';

const express = require('express');
const router = express.Router();
const auth = require('../../../middlewares/authorization');
const intraController = require('../../../controllers/services/intra.controller');

router.get('/alerts', auth(), intraController.alerts);

module.exports = router;
