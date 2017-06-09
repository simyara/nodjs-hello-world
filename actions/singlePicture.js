"use strict";

let pictureServer = require('../services/pictureServer');
let lodash = require('lodash');
let validator = require('../services/validator');

const schema = {
    name: 'string',
    details: {
        url: 'string',
        description: 'string'
    }
};


module.exports = {
    getOnePicture: function*() {
        let pictureData = yield pictureServer.findOne(this.params.id);

        if (!pictureData) {
            this.status = 404;
            this.body = {
                status: 'fail',
                data: {
                    error: 'Picture ot found'
                }
            };
            return;
        }

        this.body = {
            status: 'success',
            data: pictureData
        };
    },
    updateOnePicture: function*(next) {

        let validationResult = yield validator.validateObject(this.request.body, schema);

        if (!validationResult.isValid){
                this.status = 400;
                this.body = {
                    status: 'fail',
                    data: {
                        error: validationResult.errorMessage
                    }
                };
                return;
        }

        let pictureData = yield pictureServer.findOne(this.params.id);

        if (!pictureData) {
            this.status = 404;
            this.body = {
                status: 'fail',
                data: {
                    error: 'Picture ot found'
                }
            };
            return;
        }

        lodash.merge(pictureData, this.request.body);

        this.body = {
            status:'success',
            data: pictureData
        };

        yield next;
    }
};