"use strict";

const schema = {
    name: 'string',
    details: {
        url: 'string',
        description: 'string'
    }
};

function validate(obj, schema, res){
    return Object.keys(obj).every(function(element) {
        if (schema.hasOwnProperty(element)) {
            if ((typeof schema[element]) === 'object') {
                return validate(obj[element], schema[element],res);  //(*) recursion
            } else {
                if ((typeof obj[element]) === schema[element]) {
                    return true;
                } else {
                    res.status = 400;
                    res.body = {
                        status: 'fail',
                        dataToUpdate: {
                            error: 'Type mismatch'
                        }
                    };
                    return false;
                }
            }
        } else {
            res.status = 400;
            res.body = {
                status: 'fail',
                dataToUpdate: {
                    error: 'One or more property is not defined for the object'
                }
            };
            return false;
        }
    });
}

module.exports = {
    validateObject:  function* (next){
        let obj = this.request.body;
        let res = this.response;
        let isValid = validate(obj,schema,res);

        if (!isValid) return;


        yield next;
    }
};