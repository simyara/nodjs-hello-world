"use strict";

let router = require('koa-router')();
let aPictures = require('./actions/allPictures');

router.get('/pictures', aPictures.getAllPictures);

module.exports = router;