let koa = require('koa');
let fs = require('fs');

let app = new koa() ;

app.use(function* (next) {
    this.body = 'Hello world!';
    yield next;
});

app.use(function* (next) {
    this.body += 'Hello world1!';

});


app.listen(3000, function() {
    console.log('Server running on https://localhost:3000')
});