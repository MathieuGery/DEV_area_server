'use strict'

const express = require('express')
const router = express.Router()
const weatherController = require('../../controllers/weather.controller')
const rssController = require('../../controllers/rss.controller')
const auth = require('../../middlewares/authorization')

// Authentication example
router.get('/weather', auth(), weatherController.weather);
router.get('/weather/city', auth(), weatherController.weather_get_city);
router.post('/weather/city', auth(), weatherController.weather_post_city);

router.get('/rss', auth(), rssController.rss);
router.post('/rss/link', auth(), rssController.rss_post_link);

router.get('/secret2', auth(['admin']), (req, res) => {
    // example route for auth
    res.json({message: 'Only admin can access'})
})
router.get('/secret3', auth(['user']), (req, res) => {
    // example route for auth
    res.json({message: 'Only user can access'})
})

module.exports = router
