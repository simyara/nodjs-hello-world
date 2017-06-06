"use strict";

let router = require('koa-router')();
let aPictures = require('./actions/allPictures');
let sPicture = require('./actions/singlePicture');

router.get('/pictures', aPictures.getAllPictures);
router.get('/pictures/:id', sPicture.getOnePicture);

module.exports = router;