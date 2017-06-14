"use strict";

let pictureServer = require('../services/pictureService');

module.exports = {
    getAllPictures:  function* () {
        let itemsList = yield pictureServer.getItemsList();
        this.body = {
            status:'success',
            data: itemsList
        };
    }
};


