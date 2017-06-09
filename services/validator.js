"use strict";



function validate(obj, schema) {
    let errorMessage;

    let errorString = Object.keys(obj).map(function (element) {
        if (!schema[element]) {
            errorMessage = element + ' is not defined for the object';
            return errorMessage;
        }

        if ((typeof schema[element]) === 'object') {
            let res = validate(obj[element], schema[element]);
            return res.errorMessage;  //(*) recursion
        }

        if ((typeof obj[element]) !== schema[element]) {
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

module.exports = {
    validateObject: validate
};