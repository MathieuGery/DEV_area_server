'use strict';

const express = require('express');
const router = express.Router();
const routinesController = require('../../controllers/routines.controller');
const rssController = require('../../controllers/rss.controller');
const auth = require('../../middlewares/authorization');

// Authentication example
router.get('/list', auth(), routinesController.list);
router.post('/add', auth(), routinesController.routines_post_add);
router.delete('/delete', auth(), routinesController.routines_post_delete);
router.patch('/edit', auth(), routinesController.routines_patch_edit);

router.get('/rss', auth(), rssController.rss);
router.post('/rss/link', auth(), rssController.rss_post_link);
module.exports = router;
