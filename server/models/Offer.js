const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const offerSchema = new Schema({
    state       : String,
    shift       : String,
    companySize : String,
    descrition  : String,
    www         : String,
    contact     : String
});

module.exports = mongoose.model('Offer', offerSchema);