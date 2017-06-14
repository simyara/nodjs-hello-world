"use strict";

let _ = require('lodash');
let mongodb = require('./mongodbService');

const collName = 'pictures';

function reduceElement(element, property){
    if (element[property]){
        delete element[property];
    }
    return element;
}

function reduceEachElement(array, property){
    array.forEach((element) => reduceElement(element, property));
    return array;
}

module.exports = {
    *getItemsList() {
        let picList = yield mongodb.find(collName);
        if (picList.length>0){
            picList = reduceEachElement(picList, '_id');
        }
        return picList;
    },
    *findOne(id) {
        //return picItems.find((x) => x.id === id);
        let picItem = yield mongodb.findOne(collName, {id: id});
        if (picItem){
            picItem = reduceElement(picItem, '_id');
        }
        return picItem;
    },
    *findOneAndUpdate(id, newData) {
        //return picItems.find((x) => x.id === id);
        let picItem = (yield mongodb.findOneAndUpdate(collName, {id: id}, newData)).value;
        if (picItem){
            picItem = reduceElement(picItem, '_id');
        }
        return picItem;
    },
    *putOne(id, item) {
        let newItem = _.merge({id: id}, item);
        let picItem = (yield mongodb.insertOne(collName, newItem));
        if (picItem){
            newItem = reduceElement(newItem, '_id');
        }
        return newItem;
    },
    *deleteOne(id){
        let picItem = (yield mongodb.findOneAndDelete(collName, {id: id})).value;
        if (picItem){
            picItem = reduceElement(picItem, '_id');
        }
        return picItem;
    }
};

