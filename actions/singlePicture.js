"use strict";

let pictureServer = require('../services/pictureServer');
let lodash = require('lodash');
let validator = require('../services/validator');

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

        let validationResult = yield validator.validateObject(this.request.body);

        if (!validationResult.isValid){
                this.status = validationResult.status;
                this.body = validationResult.body;
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