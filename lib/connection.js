"use strict";

let mongoose = require('mongoose');
console.log(mongoose.version);

let db = mongoose.createConnection('mongodb://localhost/picturedb');

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function callback() {
    console.log("Connected!");
});

module.exports = db;