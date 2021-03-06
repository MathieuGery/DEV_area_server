'use strict';

const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const config = require('../config');
const httpStatus = require('http-status');
const uuidv1 = require('uuid/v1');
const cronTrigger = require('./services/imgur.controller');

exports.register = async (req, res, next) => {
    try {
        const activationKey = uuidv1();
        const body = req.body;
        body.activationKey = activationKey;
        const user = new User(body);
        console.log("la daroe ")
        const savedUser = await user.save();
        console.log("la daroaezrazer ")
        res.status(httpStatus.CREATED);
        res.send(savedUser.transform());
    } catch (error) {
        return next(User.checkDuplicateEmailError(error))
    }
};

exports.login = async (req, res, next) => {
    try {
        const user = await User.findAndGenerateToken(req.body);
        const payload = {sub: user.id};
        const token = jwt.sign(payload, config.secret);
        return res.json({message: 'OK', token: token})
    } catch (error) {
        next(error)
    }
};

exports.confirm = async (req, res, next) => {
    try {
        await User.findOneAndUpdate(
            {'activationKey': req.query.key},
            {'active': true}
        );
        return res.json({message: 'OK'})
    } catch (error) {
        next(error)
    }
};