require('dotenv').config(); // load .env file

module.exports = {
    port: process.env.PORT,
    app: process.env.APP,
    env: process.env.NODE_ENV,
    secret: process.env.SECRET,
    hostname: process.env.HOSTNAME,
    interval: process.env.CRONINTERVAL,
    ytbApiUrl: process.env.YOUTUBEAPI,
    ytbApiToken: process.env.YTBAPITOKEN,
    mongo: {
        uri: process.env.MONGOURI,
        testURI: process.env.MONGOTESTURI
    },
    transporter: {
        service: process.env.TRANSPORTER_SERVICE,
        email: process.env.TRANSPORTER_EMAIL,
        password: process.env.TRANSPORTER_PASSWORD
    }
};
