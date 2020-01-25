'use strict';

const express = require('express');
const router = express.Router();
const authRouter = require('./auth.route');
const servicesRouter = require('./service.route');
const aboutjson = require('../../controllers/about.controller');

router.get('/status', (req, res) => {
    res.send({status: 'OK'})
}); // api status
router.get('/about.json', (req, res) => {
    const ret = {
        " client ": {
            " host ": req.headers.host
        },
        " server ": {
            " current_time ": Date.now() ,
            " services ": [{
                " name ": " weather " ,
                " widgets ": [{
                    " name ": " city_temperature " ,
                    " description ": " Display temperature for a city " ,
                    " params ": [{
                        " name ": " city " ,
                        " type ": " string "
                    }]
                }]
            } , {
                " name ": " rss " ,
                " widgets ": [{
                    " name ": " article_list " ,
                    " description ": " Displaying the list of the last articles " ,
                    " params ": [{
                        " name ": " link " ,
                        " type ": " string "
                    },{
                        " name ": " number " ,
                        " type ": " integer "
                    }]
                }]
            }]
        }
    };
    res.send(ret);
});
router.use('/auth', authRouter); // mount auth paths
router.use('/services', servicesRouter);
module.exports = router;
