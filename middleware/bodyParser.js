"use strict";

let parse = require('co-body');

module.exports = {
    parseBody:  function* (next){
        if (!this.is('application/json')){
            this.status = 406;
            this.body = {
                status: 'fail',
                data: {
                    error: 'application/json only'
                }
            };
            return;
        }

        try {
            this.request.body = yield parse.json(this);
        } catch (e) {
            this.status = 400;
            this.body = {
                status: 'fail',
                data: {
                    error: 'Invalid request body format '
                }
            };
            return;
        }
        yield next;
    }
};




