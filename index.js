let koa = require('koa');
let fs = require('fs');

let app = new koa() ;

app.use(function* () {
    this.body = 'Hello world!';
});

app.listen(3000, function() {
    console.log('Server running on https://localhost:3000')
});