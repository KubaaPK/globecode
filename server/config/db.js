const mongoose = require('mongoose');

const DB_URL    = 'localhost';
const DB_NAME   = 'globecode';

var exports = module.exports = {};

exports.connect =  () => {

    mongoose.connect(`mongodb://${DB_URL}/${DB_NAME}`,(err) => {
        if(err) {
            console.log(err);
        } else {
            console.log(`Successful connect to database: ${DB_NAME}`);
        }
    });


};