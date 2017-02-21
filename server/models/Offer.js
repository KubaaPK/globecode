const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const offerSchema = new Schema({
    _creator    : {type: String, ref: 'User'},
    title       : {type: String, require: true},
    city        : {type: String, require: true},
    state       : {type: String, require: true},
    shift       : {type: String, require: true},
    companySize : {type: String, require: true},
    companyName : {type: String, require: true},
    description : {type: String, require: true},
    www         : {type: String},
    contact     : {type: String, require: true},
    salaryMin   : {type: Number, require: true},
    salaryMax   : {type: Number, require: true},
    tags        : {type: Array, require: true},
    created_at  : {type: Date, default: Date.now()} 
});

module.exports = mongoose.model('Offer', offerSchema);