const about = require('../about');

exports.list = async function routines_get_list(req, res) {
    let result = {
        status: 'success',
        routines_list: req.user.routines_list
    };
    return res.status(200).json(result);
};

exports.routines_post_add = async function routines_post_add(req, res) {
    const q = req.query;
    q.name = "Routine name";
    q.actionService = about.server.services[0].id;
    q.reactionService = about.server.services[0].id;
    q.actionTrigger = about.server.services[0].actions[0].id;
    q.reactionTrigger = about.server.services[0].reactions[0].id;
    q.actionParams = [];
    q.reactionParams = [];
    try {
        let user = req.user;
        user.routines_list.push(q);
        user.save(function (err) {
            console.log(err)
        });
        let result = {
            message: 'Routine correctly created',
            routineData: req.user.routines_list[req.user.routines_list.length - 1],
        };
        return res.status(200).json(result);
    } catch (e) {
        return res.status(400).json({
            message: "Invalid routine creation"
        });
    }
};

exports.routines_post_delete = async function routines_post_delete(req, res) {
    const q = req.query;
    if (!q.id) {
        return res.status(400).json({
            text: "Invalid request routine ID cannot be null!"
        });
    }
    try {
        let user = req.user;
        let newRoutineList = user.routines_list.filter(el => el.id !== q.id);
        user.routines_list = newRoutineList;
        user.save(function (err) {
            console.log(err)
        });
        let result = {
            status: 'success',
            message: 'Routine successfully deleted',
            routines_list: req.user.routines_list
        };
        return res.status(200).json(result);
    } catch (e) {
        return res.status(400).json({
            message: "Invalid request routines"
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
            if (q.actionService)
                user.routines_list.find(el => el.id === q.id).actionService = q.actionService;
            if (q.reactionService)
                user.routines_list.find(el => el.id === q.id).reactionService = q.reactionService;
            if (q.actionTrigger)
                user.routines_list.find(el => el.id === q.id).actionTrigger = q.actionTrigger;
            if (q.reactionTrigger)
                user.routines_list.find(el => el.id === q.id).reactionTrigger = q.reactionTrigger;
            if (q.actionParams)
                user.routines_list.find(el => el.id === q.id).actionParams = q.actionParams;
            if (q.reactionParams)
                user.routines_list.find(el => el.id === q.id).reactionParams = q.reactionParams;
        } else {
            return res.status(400).json({text: "Invalid request no name or state (active: True/False) provided"});
        }
        user.save(function (err) {
            console.log(err)
        });
        let result = {
            status: 'success',
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
