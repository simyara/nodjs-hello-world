"use strict";

let Koa = require('koa');

let router = require('./api');
let errorHandler = require('./middleware/errorHandler');

let app = new Koa();
app.use(errorHandler.createError);

app.use(router.routes());

app.listen(3000, function () {
    console.log('Server running on https://localhost:3000');
});