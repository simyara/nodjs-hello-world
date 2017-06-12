"use strict";

let _ = require('lodash');

let picItems = [
    {
        name: 'IMG_1',
        id: 'xbscw0g7e',
        details: {
            url: '/pictures/IMG_1.jsp',
            description: 'some info about IMG_1'
        }
    },
    {
        name: 'IMG_2',
        id: 't78bmt7vm',
        details: {
            url: '/pictures/IMG_2.jsp',
            description: 'some info about IMG_2'
        }
    },
    {
        name: 'IMG_3',
        id: 'iomglk84l',
        details: {
            url: '/pictures/IMG_3.jsp',
            description: 'some info about IMG_3'
        }
    },
    {
        name: 'IMG_4',
        id: 'm933bh8zo',
        details: {
            url: '/pictures/IMG_4.jsp',
            description: 'some info about IMG_4'
        }
    },
    {
        name: 'IMG_5',
        id: '5clr6mqru',
        details: {
            url: '/pictures/IMG_5.jsp',
            description: 'some info about IMG_5'
        }
    },
    {
        name: 'IMG_6',
        id: 't1e6sdxdb',
        details: {
            url: '/pictures/IMG_6.jsp',
            description: 'some info about IMG_6'
        }
    },
    {
        name: 'IMG_7',
        id: 'x6vwh17pw',
        details: {
            url: '/pictures/IMG_7.jsp',
            description: 'some info about IMG_7'
        }
    },
    {
        name: 'IMG_8',
        id: 'np4lhz6tv',
        details: {
            url: '/pictures/IMG_8.jsp',
            description: 'some info about IMG_8'
        }
    },
    {
        name: 'IMG_9',
        id: '46cirholz',
        details: {
            url: '/pictures/IMG_9.jsp',
            description: 'some info about IMG_9'
        }
    },
    {
        name: 'IMG_10',
        id: 'vqa3zm8rg',
        details: {
            url: '/pictures/IMG_10.jsp',
            description: 'some info about IMG_10'
        }
    }
];

module.exports = {
    getItemsList() {
        return picItems;
    },
    *findOne(id) {
        return picItems.find((x) => x.id === id);
    },
    *putOne(id, item) {
        let newItem = _.merge({id: id}, item);
        picItems.push(newItem);
        return newItem;
    },
    *deleteOne(id){
        picItems = picItems.filter((item) => item.id !== id);
        return id;
    }
};

