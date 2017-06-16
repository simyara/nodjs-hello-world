'use strict';

let testUtil = require('../testUtil');
let action = require('../../actions/singlePicture');
let PictureModel = require('../../Models/picture');
let assert = require('assert');
let _ = require('lodash');

describe('SinglePictureService', function() {

    let requestData;
    let requestId;

    beforeEach(function*() {
        yield testUtil.clearDb();

        requestData = {
            name: 'IMG_18',
            details: {
                url: '/pictures/IMG_18.jsp',
                description: 'some info about IMG_18'
            }
        };

        requestId = 'qwerty';
    });

    describe('API endpoint:PUT /pictures/:id', function() {
        it('should successfully create picture in DB', function*() {
            let testContext = {
                request: {
                    body: requestData
                },
                params: {
                    id: requestId
                }
            };

            yield action.addOnePicture.call(testContext);

            assert.deepEqual(testContext.body, {
                status: 'success',
                data: _.merge({
                    id: requestId
                }, requestData)
            });

            let pictures = yield PictureModel.find({}).lean();
            assert.equal(pictures.length, 1);
            let picture = pictures[0];
            delete picture._id;
            delete picture.__v;
            assert.deepEqual(picture, testContext.body.data);

        });

        it('should successfully create picture in DB without non-required fields', function*() {
            requestData = {
                name: 'IMG_18',
                details: {
                    url: '/pictures/IMG_18.jsp'
                }
            };

            let testContext = {
                request: {
                    body: requestData
                },
                params: {
                    id: requestId
                }
            };

            yield action.addOnePicture.call(testContext);

            assert.deepEqual(testContext.body, {
                status: 'success',
                data: _.merge({
                    id: requestId
                }, requestData)
            });

            let pictures = yield PictureModel.find({}).lean();
            assert.equal(pictures.length, 1);
            let picture = pictures[0];
            delete picture._id;
            delete picture.__v;
            assert.deepEqual(picture, testContext.body.data);

        });

        it('should failed create picture in DB with error Picture already exist', function*() {
            let testContext = {
                request: {
                    body: requestData
                },
                params: {
                    id: requestId
                }
            };

            yield action.addOnePicture.call(testContext);

            yield action.addOnePicture.call(testContext);

            assert.deepEqual(testContext.body, {
                status: 'fail',
                data: {
                    error: 'Picture already exist'
                }
            });

            let pictures = yield PictureModel.find({}).lean();
            assert.equal(pictures.length, 1);
            let picture = pictures[0];
            delete picture._id;
            delete picture.__v;
            assert.deepEqual(picture.id, testContext.params.id);

        });

        it('should failed create picture in DB with empty data', function*() {
            let testContext = {
                request: {
                    body: {}
                },
                params: {
                    id: requestId
                }
            };

            yield action.addOnePicture.call(testContext);

            assert.deepEqual(testContext.body, {
                status: 'fail',
                data: {
                    error: 'name value is required; details value is required'
                }
            });

            let pictures = yield PictureModel.find({}).lean();
            assert.equal(pictures.length, 0);
        });


        it('should failed create picture in DB with name1 is not defined for the object validate error', function*() {

            requestData = {
                name: 'IMG_18',
                name1: 'IMG_18',
                details: {
                    url: '/pictures/IMG_18.jsp',
                    description: 'some info about IMG_18'
                }
            };

            let testContext = {
                request: {
                    body: requestData
                },
                params: {
                    id: requestId
                }
            };

            yield action.addOnePicture.call(testContext);

            assert.deepEqual(testContext.body, {
                status: 'fail',
                data: {
                    error: 'name1 is not defined for the object'
                }
            });

            let pictures = yield PictureModel.find({}).lean();
            assert.equal(pictures.length, 0);
        });

        it('should failed create picture in DB with url1 is not defined for the object validate error', function*() {

            requestData = {
                name: 'IMG_18',
                details: {
                    url: '/pictures/IMG_18.jsp',
                    url1: '/pictures/IMG_18.jsp',
                    description: 'some info about IMG_18'
                }
            };

            let testContext = {
                request: {
                    body: requestData
                },
                params: {
                    id: requestId
                }
            };

            yield action.addOnePicture.call(testContext);

            assert.deepEqual(testContext.body, {
                status: 'fail',
                data: {
                    error: 'url1 is not defined for the object'
                }
            });

            let pictures = yield PictureModel.find({}).lean();
            assert.equal(pictures.length, 0);
        });


        it('should failed create picture in DB with name type mismatch for the object validate error', function*() {
            requestData = {
                name: 123,
                details: {
                    url: '/pictures/IMG_18.jsp',
                    description: 'some info about IMG_18'
                }
            };

            let testContext = {
                request: {
                    body: requestData
                },
                params: {
                    id: requestId
                }
            };

            yield action.addOnePicture.call(testContext);

            assert.deepEqual(testContext.body, {
                status: 'fail',
                data: {
                    error: 'name type mismatch'
                }
            });

            let pictures = yield PictureModel.find({}).lean();
            assert.equal(pictures.length, 0);
        });

        it('should failed create picture in DB with name value is required validate error', function*() {
            requestData = {
                details: {
                    url: '/pictures/IMG_18.jsp',
                    description: 'some info about IMG_18'
                }
            };

            let testContext = {
                request: {
                    body: requestData
                },
                params: {
                    id: requestId
                }
            };

            yield action.addOnePicture.call(testContext);

            assert.deepEqual(testContext.body, {
                status: 'fail',
                data: {
                    error: 'name value is required'
                }
            });

            let pictures = yield PictureModel.find({}).lean();
            assert.equal(pictures.length, 0);
        });


        it('should failed create picture in DB with details type mismatch for the object validate error', function*() {
            requestData = {
                name: 'IMG_18',
                details: 'lorem ipsun'
            };

            let testContext = {
                request: {
                    body: requestData
                },
                params: {
                    id: requestId
                }
            };

            yield action.addOnePicture.call(testContext);

            assert.deepEqual(testContext.body, {
                status: 'fail',
                data: {
                    error: 'details type mismatch'
                }
            });

            let pictures = yield PictureModel.find({}).lean();
            assert.equal(pictures.length, 0);
        });

        it('should failed create picture in DB with details value is required validate error', function*() {
            requestData = {
                name: 'IMG_18'
            };

            let testContext = {
                request: {
                    body: requestData
                },
                params: {
                    id: requestId
                }
            };

            yield action.addOnePicture.call(testContext);

            assert.deepEqual(testContext.body, {
                status: 'fail',
                data: {
                    error: 'details value is required'
                }
            });

            let pictures = yield PictureModel.find({}).lean();
            assert.equal(pictures.length, 0);
        });


        it('should failed create picture in DB with url type mismatch for the object validate error', function*() {
            requestData = {
                name: 'IMG_18',
                details: {
                    url: 23,
                    description: 'some info about IMG_18'
                }
            };

            let testContext = {
                request: {
                    body: requestData
                },
                params: {
                    id: requestId
                }
            };

            yield action.addOnePicture.call(testContext);

            assert.deepEqual(testContext.body, {
                status: 'fail',
                data: {
                    error: 'url type mismatch'
                }
            });

            let pictures = yield PictureModel.find({}).lean();
            assert.equal(pictures.length, 0);
        });

        it('should failed create picture in DB with url value is required validate error', function*() {
            requestData = {
                name: 'IMG_18',
                details: {
                    description: 'some info about IMG_18'
                }
            };

            let testContext = {
                request: {
                    body: requestData
                },
                params: {
                    id: requestId
                }
            };

            yield action.addOnePicture.call(testContext);

            assert.deepEqual(testContext.body, {
                status: 'fail',
                data: {
                    error: 'url value is required'
                }
            });

            let pictures = yield PictureModel.find({}).lean();
            assert.equal(pictures.length, 0);
        });


        it('should failed create picture in DB with description type mismatch for the object validate error', function*() {
            requestData = {
                name: 'IMG_18',
                details: {
                    url: '/pictures/IMG_18.jsp',
                    description: 13
                }
            };

            let testContext = {
                request: {
                    body: requestData
                },
                params: {
                    id: requestId
                }
            };

            yield action.addOnePicture.call(testContext);

            assert.deepEqual(testContext.body, {
                status: 'fail',
                data: {
                    error: 'description type mismatch'
                }
            });

            let pictures = yield PictureModel.find({}).lean();
            assert.equal(pictures.length, 0);
        });

    });


    describe('API endpoint:POST /pictures/:id', function() {
        let pictureBefore;

        beforeEach(function*() {

            requestData = {
                name: 'IMG_19',
                details: {
                    url: '/pictures/IMG_18.jsp',
                    description: 'some info about IMG_18'
                }
            };
        });

        describe('case: empty DB', function() {

            it('should failed update picture in empty DB', function*() {

                let testContext = {
                    request: {
                        body: requestData
                    },
                    params: {
                        id: requestId
                    }
                };

                yield action.updateOnePicture.call(testContext);

                assert.deepEqual(testContext.body, {
                    status: 'fail',
                    data: {
                        error: 'Picture not found'
                    }
                });
            });
        });

        describe('case: item exist in DB', function() {
            let createRequestData;
            let pictureBefore;

            beforeEach(function*() {

                createRequestData = {
                    name: 'IMG_18',
                    details: {
                        url: '/pictures/IMG_18.jsp',
                        description: 'some info about IMG_18'
                    }
                };

                requestData = {
                    name: 'IMG_19',
                    details: {
                        url: '/pictures/IMG_19.jsp',
                        description: 'some info about IMG_19'
                    }
                };


                let testContext = {
                    request: {
                        body: createRequestData
                    },
                    params: {
                        id: requestId
                    }
                };

                yield action.addOnePicture.call(testContext);
                pictureBefore = yield PictureModel.findOne({}).lean();
                delete pictureBefore._id;
                delete pictureBefore.__v;
            });

            it('should successfully update picture in DB', function*() {

                let testContext = {
                    request: {
                        body: requestData
                    },
                    params: {
                        id: requestId
                    }
                };

                yield action.updateOnePicture.call(testContext);

                assert.deepEqual(testContext.body, {
                    status: 'success',
                    data: _.merge({
                        id: requestId
                    }, requestData)
                });

                let pictures = yield PictureModel.find({}).lean();
                assert.equal(pictures.length, 1);
                let picture = pictures[0];

                assert.equal(picture.name, requestData.name);
                assert.equal(picture.details.url, requestData.details.url);
                assert.equal(picture.details.description, requestData.details.description);

                delete picture._id;
                delete picture.__v;
                delete picture.name;
                delete pictureBefore.name;
                delete picture.details.url;
                delete pictureBefore.details.url;
                delete picture.details.description;
                delete pictureBefore.details.description;

                assert.deepEqual(picture, pictureBefore);

            });

            it('should successfully update picture in DB with empty data', function*() {

                let testContext = {
                    request: {
                        body: {}
                    },
                    params: {
                        id: requestId
                    }
                };

                yield action.updateOnePicture.call(testContext);

                assert.deepEqual(testContext.body, {
                    status: 'success',
                    data: _.merge({
                        id: requestId
                    }, createRequestData)
                });

                let pictures = yield PictureModel.find({}).lean();
                assert.equal(pictures.length, 1);
                let picture = pictures[0];
                delete picture._id;
                delete picture.__v;
                assert.deepEqual(picture, pictureBefore);

            });

            it('should fail update picture in DB with picture not found', function*() {

                requestId = 'ytrewq';

                let testContext = {
                    request: {
                        body: requestData
                    },
                    params: {
                        id: requestId
                    }
                };

                yield action.updateOnePicture.call(testContext);

                assert.deepEqual(testContext.body, {
                    status: 'fail',
                    data: {
                        error: 'Picture not found'
                    }
                });

                let pictures = yield PictureModel.find({}).lean();
                assert.equal(pictures.length, 1);
                let picture = pictures[0];
                delete picture._id;
                delete picture.__v;
                assert.deepEqual(picture, pictureBefore);

            });

        });

        describe('case: validation errors', function() {
            it('should failed update picture in DB with name1 is not defined for the object validate error', function*() {

                requestData = {
                    name: 'IMG_19',
                    name1: 'IMG_19',
                    details: {
                        url: '/pictures/IMG_19.jsp',
                        description: 'some info about IMG_19'
                    }
                };

                let testContext = {
                    request:{
                        body : requestData
                    },
                    params: {
                        id : requestId
                    }
                };

                yield action.updateOnePicture.call(testContext);

                assert.deepEqual(testContext.body, {
                    status: 'fail',
                    data: {
                        error: 'name1 is not defined for the object'
                    }
                });

                let pictures = yield PictureModel.find({}).lean();
                assert.equal(pictures.length, 0);
            });

            it('should failed update picture in DB with url1 is not defined for the object validate error', function*() {

                requestData = {
                    name: 'IMG_18',
                    details: {
                        url: '/pictures/IMG_18.jsp',
                        url1: '/pictures/IMG_18.jsp',
                        description: 'some info about IMG_18'
                    }
                };

                let testContext = {
                    request:{
                        body : requestData
                    },
                    params: {
                        id : requestId
                    }
                };

                yield action.updateOnePicture.call(testContext);

                assert.deepEqual(testContext.body, {
                    status: 'fail',
                    data: {
                        error: 'url1 is not defined for the object'
                    }
                });

                let pictures = yield PictureModel.find({}).lean();
                assert.equal(pictures.length, 0);
            });


            it('should failed update picture in DB with name type mismatch for the object validate error', function*() {
                requestData = {
                    name: 123,
                    details: {
                        url: '/pictures/IMG_18.jsp',
                        description: 'some info about IMG_18'
                    }
                };

                let testContext = {
                    request:{
                        body : requestData
                    },
                    params: {
                        id : requestId
                    }
                };

                yield action.updateOnePicture.call(testContext);

                assert.deepEqual(testContext.body, {
                    status: 'fail',
                    data: {
                        error: 'name type mismatch'
                    }
                });

                let pictures = yield PictureModel.find({}).lean();
                assert.equal(pictures.length, 0);
            });

            it('should failed update picture in DB with details type mismatch for the object validate error', function*() {
                requestData = {
                    name: 'IMG_18',
                    details: 'lorem ipsun'
                };

                let testContext = {
                    request:{
                        body : requestData
                    },
                    params: {
                        id : requestId
                    }
                };

                yield action.updateOnePicture.call(testContext);

                assert.deepEqual(testContext.body, {
                    status: 'fail',
                    data: {
                        error: 'details type mismatch'
                    }
                });

                let pictures = yield PictureModel.find({}).lean();
                assert.equal(pictures.length, 0);
            });

            it('should failed update picture in DB with url type mismatch for the object validate error', function*() {
                requestData = {
                    name: 'IMG_18',
                    details: {
                        url: 23,
                        description: 'some info about IMG_18'
                    }
                };

                let testContext = {
                    request:{
                        body : requestData
                    },
                    params: {
                        id : requestId
                    }
                };

                yield action.updateOnePicture.call(testContext);

                assert.deepEqual(testContext.body, {
                    status: 'fail',
                    data: {
                        error: 'url type mismatch'
                    }
                });

                let pictures = yield PictureModel.find({}).lean();
                assert.equal(pictures.length, 0);
            });

            it('should failed update picture in DB with description type mismatch for the object validate error', function*() {
                requestData = {
                    name: 'IMG_18',
                    details: {
                        url: '/pictures/IMG_18.jsp',
                        description: 13
                    }
                };

                let testContext = {
                    request:{
                        body : requestData
                    },
                    params: {
                        id : requestId
                    }
                };

                yield action.updateOnePicture.call(testContext);

                assert.deepEqual(testContext.body, {
                    status: 'fail',
                    data: {
                        error: 'description type mismatch'
                    }
                });

                let pictures = yield PictureModel.find({}).lean();
                assert.equal(pictures.length, 0);
            });
        });


    });

    describe('API endpoint:DELETE /pictures/:id', function() {
        let pictureBefore;


        it('should failed delete picture from empty DB', function*() {

            let testContext = {
                params: {
                    id: requestId
                }
            };

            yield action.deleteOnePicture.call(testContext);

            assert.deepEqual(testContext.body, {
                status: 'fail',
                data: {
                    error: 'Picture not found'
                }
            });
        });

        describe('case: item exist in DB', function() {
            let createRequestData;
            let pictureBefore;

            beforeEach(function*() {

                createRequestData = {
                    name: 'IMG_18',
                    details: {
                        url: '/pictures/IMG_18.jsp',
                        description: 'some info about IMG_18'
                    }
                };

                let testContext = {
                    request: {
                        body: createRequestData
                    },
                    params: {
                        id: requestId
                    }
                };

                yield action.addOnePicture.call(testContext);
                pictureBefore = yield PictureModel.findOne({}).lean();
                delete pictureBefore._id;
                delete pictureBefore.__v;
            });

            it('should successfully delete picture from DB', function*() {

                let testContext = {
                    params: {
                        id: requestId
                    }
                };

                yield action.deleteOnePicture.call(testContext);

                assert.deepEqual(testContext.body, {
                    status: 'success',
                    data: _.merge({
                        id: requestId
                    }, requestData)
                });

                let pictures = yield PictureModel.find({}).lean();
                assert.equal(pictures.length, 0);
            });

            it('should fail delete picture from DB with picture not found error', function*() {

                requestId = 'ytrewq';

                let testContext = {
                    params: {
                        id: requestId
                    }
                };

                yield action.deleteOnePicture.call(testContext);

                assert.deepEqual(testContext.body, {
                    status: 'fail',
                    data: {
                        error: 'Picture not found'
                    }
                });

                let pictures = yield PictureModel.find({}).lean();
                assert.equal(pictures.length, 1);
                let picture = pictures[0];
                delete picture._id;
                delete picture.__v;
                assert.deepEqual(picture, pictureBefore);

            });

        });


    })

})