'use strict';
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const httpStatus = require('http-status');
const APIError = require('../utils/APIError');
const transporter = require('../services/transporter');
const config = require('../config');
const about = require('../about');
const Schema = mongoose.Schema;

const roles = [
    'user', 'admin'
];

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 128
    },
    activationKey: {
        type: String,
        unique: true
    },
    active: {
        type: Boolean,
        default: true
    },
    role: {
        type: String,
        default: 'user',
        enum: roles
    },
    routines_list: [{
        name: {type: String, default: 'New routine name'},
        actionService: {type: String, default: about.server.services[0].id},
        reactionService: {type: String, default: about.server.services[0].id},
        actionTrigger: {type: String, default: about.server.services[0].actions[0].id},
        reactionTrigger: {type: String, default: about.server.services[0].reactions[0].id},
        actionParams: {type: Array, default: []},
        reactionParams: {type: Array, default: []},
        active: {type: Boolean, default: false}
    }],
    access_token_list: [{
        id: {type: 'String'},
        access_token: {type: 'String'},
        username: {type: 'String'}
    }],
    data: {
        nbPostImgImgur: {type: String, default: 0},
        likedVids: {type: String, default: 0},
        lastMailId: {type: String, default: ''},
        lastMailIdFromUser: {type: String, default: 0},
    },
}, {
    timestamps: true
});

userSchema.pre('save', async function save(next) {
    try {
        if (!this.isModified('password')) {
            return next()
        }

        this.password = bcrypt.hashSync(this.password);

        return next()
    } catch (error) {
        return next(error)
    }
});

userSchema.post('save', async function saved(doc, next) {
    try {
        const mailOptions = {
            from: 'noreply',
            to: this.email,
            subject: 'Confirm creating account',
            html: `<div><h1>Hello new user!</h1><p>Click <a href="${config.hostname}/api/auth/confirm?key=${this.activationKey}">link</a> to activate your new account.</p></div><div><h1>Hello developer!</h1><p>Feel free to change this template ;).</p></div>`
        };
        return next()
    } catch (error) {
        return next(error)
    }
});

userSchema.method({
    transform() {
        const transformed = {};
        const fields = ['id', 'email', 'createdAt', 'role'];

        fields.forEach((field) => {
            transformed[field] = this[field]
        });

        return transformed
    },

    passwordMatches(password) {
        return bcrypt.compareSync(password, this.password)
    }
});

userSchema.statics = {
    roles,

    checkDuplicateEmailError(err) {
        if (err.code === 11000) {
            var error = new Error('Email already taken');
            error.errors = [{
                field: 'email',
                location: 'body',
                messages: ['Email already taken']
            }];
            error.status = httpStatus.CONFLICT;
            return error
        }

        return err
    },

    async findAndGenerateToken(payload) {
        const {email, password} = payload;
        if (!email) throw new APIError('Email must be provided for login');

        const user = await this.findOne({email}).exec();
        if (!user) throw new APIError(`No user associated with ${email}`, httpStatus.NOT_FOUND);

        const passwordOK = await user.passwordMatches(password);

        if (!passwordOK) throw new APIError(`Password mismatch`, httpStatus.UNAUTHORIZED);

        if (!user.active) throw new APIError(`User not activated`, httpStatus.UNAUTHORIZED);

        return user
    }
};

module.exports = mongoose.model('User', userSchema);
