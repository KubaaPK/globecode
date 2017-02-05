const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const offerSchema = new Schema({
    title       : String,
    city        : String,
    state       : String,
    shift       : String,
    companySize : String,
    descrition  : String,
    www         : String,
    contact     : String,
    salary      : String
});

module.exports = mongoose.model('Offer', offerSchema);