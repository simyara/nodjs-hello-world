"use strict";
let Koa = require('koa');
let fs = require('fs');

let router = require('./api');

let app = new Koa();

app.use(router.routes());

app.listen(3000, function () {
    console.log('Server running on https://localhost:3000');
});