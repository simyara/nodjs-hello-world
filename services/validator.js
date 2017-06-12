"use strict";


//all fields in obj need to be presented in schema and need type like as in schema
function validate(obj, schema) {
    let errorMessage;

    let errorString = Object.keys(obj).map(function (element) {
        if (!schema[element]) {
            errorMessage = element + ' is not defined for the object';
            return errorMessage;
        }

        if ((typeof schema[element].type) === 'object') {
            let res = validate(obj[element], schema[element].type);
            return res.errorMessage;  //(*) recursion
        }

        if ((typeof obj[element]) !== schema[element].type) {
            errorMessage = element + ' type mismatch';
            return errorMessage;
        }

        return;
    }).filter(function (x) {
        return x;
    });

    let resObj = {
        isValid: errorString.length <= 0,
        errorMessage: errorString.join()
    };

    return resObj;
}

//all fields in schema marked as required must be presented in object
function validateRequired(obj, schema) {
    let errorMessage;

    let errorString = Object.keys(schema).filter(function (key) {
        return (((typeof schema[key].type) === 'object') || schema[key].required);
    }).map(function (element) {
        if ((typeof schema[element].type) === 'object') {
            let res = validateRequired(obj[element], schema[element].type);
            return res.errorMessage;  //(*) recursion
        }
        if (!obj[element]) {
            errorMessage = element + ' is required';
            return errorMessage;
        }

        return;
    }).filter(function (x) {
        return x;
    });

    let resObj = {
        isValid: errorString.length <= 0,
        errorMessage: errorString.join()
    };

    return resObj;
}

module.exports = {
    validateObject: validate,
    validateRequiredFields: validateRequired
};