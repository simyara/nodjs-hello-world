"use strict";

let _ = require('lodash');
let co = require('co');

let Picture = require('../Models/picture');

function reduceElement(element, propertiesArray){
    if (element) {
        propertiesArray.forEach(function (property) {
            if (element[property] !== undefined) {
                delete element[property];
            }
        });
    }
    return element;
}

function reduceEachElement(array, propertiesArray){
    if (array.length>0) {
        array.forEach((element) => reduceElement(element, propertiesArray));
    }
    return array;
}

module.exports = {
    *getItemsList() {
            let picList = yield Picture.find().lean();
            if (picList.length>0){
                picList = reduceEachElement(picList, ['_id', '__v']);
            }
            return picList;
    },
    *findOne(id) {
        //return picItems.find((x) => x.id === id);
        let picItem = yield Picture.findOne({id: id}).lean();
        picItem = reduceElement(picItem, ['_id', '__v']);
        return picItem;
    },
    *findOneAndUpdate(id, newData) {
        //return picItems.find((x) => x.id === id);
        let picItem = yield Picture.findOneAndUpdate({id: id}, { $set: newData}, {new: true}).lean();
        picItem = reduceElement(picItem, ['_id', '__v']);
        return picItem;
    },
    *putOne(id, item) {
        let newPicture = new Picture(_.merge({id: id}, item));
        yield newPicture.save();
        newPicture = reduceElement(newPicture.toObject(), ['_id', '__v']);
        return newPicture;
    },
    *deleteOne(id){
        let picItem = yield Picture.findOneAndRemove({id: id}).lean();
        picItem = reduceElement(picItem, ['_id', '__v']);
        return picItem;
    }
};

