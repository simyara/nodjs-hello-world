"use strict";

let pictureServer = require('../services/pictureServer');

module.exports = {
    getOnePicture:  function* () {
        this.body = {
            status:'success',
            data: pictureServer.findOne(this.params.id)
        };
    }
};


