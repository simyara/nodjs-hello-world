"use strict";

let MongoClient = require('mongodb').MongoClient;
let assert = require('assert');

let dbName='picturesdb';
// Connection URL
let url = 'mongodb://localhost:27017/' + dbName;

function open() {

    return new Promise((resolve, reject) => {
        // Use connect method to connect to the Server
        MongoClient.connect(url, (err, db) => {
            if (err) {
                console.error('Failed to connect to mongo on startup', err);
                reject(err);
                return;
            }
            console.log("Connected correctly to mongo db server.");
            resolve(db);
        });
    });
}

function close(db) {
    //Close connection
    if (db) {
        db.close();
    }
}

function findToArray(db, collName,  query){
    let collection = db.collection(collName);

    return collection.find(query).toArray();
}

function* find(collName, query = {}) {
    let db = yield open();
    let list = yield findToArray(db, collName,  query);
    close(db);
    return list;
}

function* findOne(collName, query = {}) {
    let db = yield open();
    let item  = yield db.collection(collName).findOne(query);
    close(db);
    return item;
}

function* findOneAndUpdate(collName, query = {}, update) {
    let db = yield open();
    let item  = yield db.collection(collName).findOneAndUpdate(query, { $set:  update}, {returnOriginal: false});
    close(db);
    return item;
}

function* findOneAndDelete(collName, query = {}) {
    let db = yield open();
    let item  = yield db.collection(collName).findOneAndDelete(query);
    close(db);
    return item;
}

function* insertOne(collName, query = {}) {
    let db = yield open();
    let item  = yield db.collection(collName).insertOne(query);
    close(db);
    return item;
}

module.exports = {
    connectingDb: open,
    find: find,
    findOne: findOne,
    findOneAndUpdate: findOneAndUpdate,
    findOneAndDelete: findOneAndDelete,
    insertOne: insertOne
};