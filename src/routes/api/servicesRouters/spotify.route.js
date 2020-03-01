'use strict';

const express = require('express');
const router = express.Router();
const auth = require('../../../middlewares/authorization');
const intraController = require('../../../controllers/services/spotify.controller');

router.get('/status', auth(), intraController.status);
router.get('/test', auth(), intraController.test);

module.exports = router;
