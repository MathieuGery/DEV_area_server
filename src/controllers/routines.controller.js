const superagent = require('superagent');
const burl = "api.openweathermap.org/data/2.5/weather";
const appid_weather = "5395bcad51f4b37afe5b814977728a96";

exports.list = async function weather_get_city(req, res) {
    var result = {
        status: 'succed',
        routines_list: req.user.routines_list
    };
    return res.status(200).json(result);
};

exports.routines_post = async function weather_post_city(req, res) {
    const q = req.query;
    console.log(q);
    if (!q.name || !q.actionService || !q.active) {
        return res.status(400).json({
            text: "Invalid request routines can not be null!"
        });
    }
    try {
        var user = req.user;
        user.routines_list.push(q);
        user.save(function (err) {
            console.log(err)
        });
        var result = {
            status: 'succed',
            routines_list: req.user.routines_list
        };
        return res.status(200).json(result);
    } catch (e) {
        return res.status(400).json({
            text: "Invalid request routines"
        });
    }
};

exports.routines_post_delete = async function routines_post_delete(req, res) {
    const q = req.query;
    if (!q.id) {
        return res.status(400).json({
            text: "Invalid request routine id can not be null!"
        });
    }
    try {
        var user = req.user;
        someArray2 = user.routines_list.filter( el => el.id !== q.id );
        user.routines_list = someArray2;
        user.save(function (err) {
            console.log(err)
        });
        var result = {
            status: 'succed',
            routines_list: req.user.routines_list
        };
        return res.status(200).json(result);
    } catch (e) {
        return res.status(400).json({
            text: "Invalid request routines"
        });
    }
};

exports.routines_patch_edit = async function routines_patch_edit(req, res) {
    const q = req.query;
    if (!q.id) {
        return res.status(400).json({
            text: "Invalid request routine id can not be null!"
        });
    }
    try {
        var user = req.user;
        user.routines_list.find( el => el.id === q.id ).active = q.active;
        user.save(function (err) {
            console.log(err)
        });
        var result = {
            status: 'succed',
            routines_list: req.user.routines_list
        };
        return res.status(200).json(result);
    } catch (e) {
        return res.status(400).json({
            text: "Invalid request routines"
        });
    }
};
