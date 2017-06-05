let Koa = require('koa');
let fs = require('fs');

let router = require('./api');

let app = new Koa() ;

app.use(router.routes());

app.use(function* (next) {
    this.body += '1st: Hello world!     ';
    yield next;
    this.body += '3rd: Hello world!     ';
});

app.use(function* () {
    this.body += '2nd: Hello world1';

});

app.listen(3000, function() {
    console.log('Server running on https://localhost:3000')
});