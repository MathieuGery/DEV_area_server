'use strict'

const mongoose = require('./services/mongoose')
const app = require('./services/express')

// start app and connect to database
app.start()
mongoose.connect()

function intervalFunc() {
    console.log('Cant stop me now!');
}

setInterval(intervalFunc, 1500);

module.exports = app
