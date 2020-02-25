exports.list = async function weather_get_city(req, res) {
    var result = {
        status: 'succed',
        routines_list: req.user.routines_list
    };
    return res.status(200).json(result);
};

exports.routines_post = async function routines_post_add(req, res) {
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
            message: 'Routine successfully deleted',
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
        if (q.active || q.name) {
            if (q.active)
                user.routines_list.find(el => el.id === q.id).active = q.active;
            if (q.name)
                user.routines_list.find(el => el.id === q.id).name = q.name;
        }
        else
            return res.status(400).json({
                text: "Invalid request no name or state (active: True/False) provided"
            });
        user.save(function (err) {
            console.log(err)
        });
        var result = {
            status: 'succed',
            message: 'Routine successfully updated',
            routines_list: req.user.routines_list
        };
        return res.status(200).json(result);
    } catch (e) {
        return res.status(400).json({
            text: "Invalid request routines"
        });
    }
};
