"use strict";
let pictureServer = require('../services/pictureServer');

module.exports = {
    getAllPictures:  function* () {
        this.body = pictureServer.getItemsList();
    }
};


