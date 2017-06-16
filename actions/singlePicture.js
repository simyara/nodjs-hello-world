"use strict";

let pictureServer = require('../services/pictureService');
let _ = require('lodash');
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
    updateOnePicture: function*() {

        const schema = {
            name: {type: 'string'},
            details: {
                type :'object',
                properties: {
                    url: {type: 'string'},
                    description: {type: 'string'}
                }
            }
        };

        let validationResult = yield validator.validate(this.request.body, schema);

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

        let pictureData = yield pictureServer.findOneAndUpdate(this.params.id, this.request.body);

        if (!pictureData) {
            this.status = 404;
            this.body = {
                status: 'fail',
                data: {
                    error: 'Picture not found'
                }
            };
            return;
        }

        this.body = {
            status:'success',
            data: pictureData
        };
    },
    addOnePicture: function*() {

        const schemaToPut = {
            name: {type: 'string', required: true},
            details: {
                type : 'object',
                required: true,
                properties: {
                    url: {type: 'string', required: true},
                    description: {type: 'string', required: false}
                }
            }
        };

        let validationResult = yield validator.validate(this.request.body, schemaToPut);

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

        let pictureData = yield pictureServer.findOne(this.params.id, this.request.body);

        if (pictureData) {
            this.status = 400;
            this.body = {
                status: 'fail',
                data: {
                    error: 'Picture already exist'
                }
            };
            return;
        }

        let newPictureData = yield pictureServer.putOne(this.params.id, this.request.body);

        this.body = {
            status:'success',
            data: newPictureData
        };
    },
    deleteOnePicture: function*() {
        let pictureData = yield pictureServer.deleteOne(this.params.id);

        if (!pictureData) {
            this.status = 404;
            this.body = {
                status: 'fail',
                data: {
                    error: 'Picture not found'
                }
            };
            return;
        }

        this.body = {
            status: 'success',
            data: pictureData
        };
    }
};