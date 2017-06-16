"use strict";

let db = require('../lib/connection');

let PictureSchema = ({
    id: {type: String, index: true},
    name: {type: String},
    details: {
        url: {type: String},
        description: {type: String}
    }
});

let Picture = db.model("Picture", PictureSchema);

module.exports = Picture;