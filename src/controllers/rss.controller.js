let Parser = require('rss-parser');
let parser = new Parser();


exports.rss_post_link = async function rss_post_link(req, res) {
    const {q} = req.query;
    if (!q) {
        return res.status(400).json({
            text: "Invalid request link can not be null!"
        });
    }
    try {
        var user = req.user;
        user.rss_link = q;
        user.save(function (err) {
        })
        var result = {
            status: 'succed',
            user: req.user.email,
            link: req.user.rss_link
        }
        return res.status(200).json(result);
    } catch (e) {
        return res.status(400).json({
            text: "Invalid request link"
        });
    }
};

exports.rss = async function rss(req, res) {
    const ret = []
    await parser.parseURL(req.user.rss_link)
        .then((response) => {
            response.items.forEach(item => {
                ret.push(item.link)
            });
            return res.status(200).json(ret);
        })
        .catch((error) => {
            return res.status(400).json(error)
        });
}
