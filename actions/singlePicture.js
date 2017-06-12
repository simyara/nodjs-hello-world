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

        const schema = {
            name: {type: 'string'},
            details: {
                type :{
                    url: {type: 'string'},
                    description: {type: 'string'}
                }
            }
        };

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
    },
    addOnePicture: function*(next) {

        const schema = {
            name: {type: 'string'},
            details: {
                type :{
                    url: {type: 'string'},
                    description: {type: 'string'}
                }
            }
        };

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
        };

        const schemaToPut = {
            name: {type: 'string', required: true},
            details: {
                type :{
                    url: {type: 'string', required: true},
                    description: {type: 'string', required: false}
                }
            }
        };

        let validationReqResult = yield validator.validateRequiredFields(this.request.body, schemaToPut);

        if (!validationReqResult.isValid){
            this.status = 400;
            this.body = {
                status: 'fail',
                data: {
                    error: validationReqResult.errorMessage
                }
            };
            return;
        }

        let pictureData = yield pictureServer.findOne(this.params.id, this.request.body);

        if (pictureData) {
            this.status = 404;
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

        yield next;
    },
    deleteOnePicture: function*() {
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

        let deletedId = yield pictureServer.deleteOne(this.params.id);

        this.body = {
            status: 'success',
            data: deletedId
        };
    }
};