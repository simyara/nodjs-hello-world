"use strict";

const schema = {
    name: 'string',
    details: {
        url: 'string',
        description: 'string'
    }
};

function validate(obj, schema){

    let resultObj = {
        isValid: true
    };

    Object.keys(obj).every(function(element) {

        if (!schema[element]) {
            resultObj.isValid = false;
            resultObj.status = 400;
            resultObj.body = {
                status: 'fail',
                data: {
                    error: 'One or more property is not defined for the object'
                }
            };
            return false;
        }

        if ((typeof schema[element]) === 'object') {
            return validate(obj[element], schema[element]);  //(*) recursion
        }

        if ((typeof obj[element]) !== schema[element]) {
            resultObj.isValid = false;
            resultObj.status = 400;
            resultObj.body = {
                status: 'fail',
                data: {
                    error: 'Type mismatch'
                }
            };

        }
        return true;
    });
    return resultObj;
}

module.exports = {
    validateObject:  function* (obj){
        //let obj = this.request.body;
       return validate(obj,schema);

    }
};