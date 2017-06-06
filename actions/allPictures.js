"use strict";

let pictureServer = require('../services/pictureServer');

module.exports = {
    getAllPictures:  function* () {
        this.body = {
            status:'success',
            data: pictureServer.getItemsList()
        };
    }
};


