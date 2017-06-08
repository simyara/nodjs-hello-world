"use strict";

let pictureServer = require('../services/pictureServer');
let pictureValidator = require('../middleware/validator');

function updateItem(origObj, dataToUpdate){
    Object.keys(dataToUpdate).forEach(function(key){
        if ((typeof dataToUpdate[key]) === 'object'){
            updateItem(origObj[key], dataToUpdate[key]);
        }
        else {
            origObj[key]=dataToUpdate[key];
        }
    });
}

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

        updateItem(pictureData, this.request.body);

        this.body = {
            status:'success',
            data: pictureData
        };

        yield next;
    }
};