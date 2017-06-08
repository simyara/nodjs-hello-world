"use strict";

let router = require('koa-router')();
let aPictures = require('./actions/allPictures');
let sPicture = require('./actions/singlePicture');
let bodyParser = require('./middleware/bodyParser');
let validator = require('./middleware/validator');



router.get('/pictures', aPictures.getAllPictures);

router.get('/pictures/:id', sPicture.getOnePicture);

router.post('/pictures/:id', bodyParser.parseBody, validator.validateObject, sPicture.updateOnePicture);


module.exports = router;