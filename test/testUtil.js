'use strict';

let mocha = require('mocha');
let coMocha = require('co-mocha');
let PictureModel = require('../Models/picture');

coMocha(mocha);

module.exports = {
    *clearDb(){
        yield PictureModel.remove({});
    }
};