"use strict";

let _ = require('lodash');

function validateObject(obj, schema) {

    let errorUnexpectedMessage;
    let errorMessage;

    let unexpected = _.difference(Object.keys(obj), Object.keys(schema));

    if (unexpected.length > 0) {
        errorUnexpectedMessage = unexpected.join(', ') + ' is not defined for the object';
    }

    let errorString = Object.keys(schema).map(function (key) {

        if (schema[key].required) {
            if (obj[key] === undefined) {
                errorMessage = key + ' value is required';
                return errorMessage;
            }
        }

        if (obj[key] === undefined) {
            return;
        }

        if ((typeof obj[key]) !== schema[key].type) {
            errorMessage = key + ' type mismatch';
            return errorMessage;
        }

        if (schema[key].type === 'object') {
            let res = validateObject(obj[key], schema[key].properties);
            return res.errorMessage;  //(*) recursion
        }

        return;
    }).filter(function (x) {
        return x;
    });

    if (errorUnexpectedMessage) {
        errorString.unshift(errorUnexpectedMessage);
    }

    let resObj = {
        isValid: errorString.length <= 0,
        errorMessage: errorString.join('; ')
    };

    return resObj;

}

module.exports = {
    validate: validateObject
};