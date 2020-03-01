'use strict';

const express = require('express');
const router = express.Router();
const auth = require('../../../middlewares/authorization');
const imgurController = require('../../../controllers/services/imgur.controller');

router.get('/status', auth(), imgurController.status);
router.get('/getuserposts', auth(), imgurController.getUserPosts);

module.exports = router;
