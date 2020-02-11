const superagent = require('superagent');
const burl = "api.openweathermap.org/data/2.5/weather";
const appid_weather = "5395bcad51f4b37afe5b814977728a96";

exports.weather_get_city = async function weather_get_city(req, res) {
    var result = {
        status: 'succed',
        user: req.user.email,
        city: req.user.weather_city
    }
    return res.status(200).json(result);
};

exports.weather_post_city = async function weather_post_city(req, res) {
    const {q} = req.query;
    if (!q || !appid_weather) {
        return res.status(400).json({
            text: "Invalid request city can not be null!"
        });
    }
    try {
        var user = req.user;
        user.weather_city = q;
        user.save(function (err) {


        })
        var result = {
            status: 'succed',
            user: req.user.email,
            city: req.user.weather_city
        }
        return res.status(200).json(result);
    } catch (e) {
        return res.status(400).json({
            text: "Invalid request city"
        });
    }
};

exports.weather = async function weather(req, res) {
    superagent.get(`${burl}`)
        .query({q: req.user.weather_city, appid: appid_weather, units: "metric"})
        .end((err, resp) => {
            if (err) {
                return res.status(400).json(resp.body);
            }
            console.log(resp.body);
            return res.status(200).json(resp.body);
        });
}
