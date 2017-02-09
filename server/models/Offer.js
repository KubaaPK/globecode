const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const offerSchema = new Schema({
    fields: {
        title       : {type: String},
        city        : {type: String},
        state       : {type: String},
        shift       : {type: String},
        companySize : {type: String},
        companyName : {type: String},
        descrition  : {type: String},
        www         : {type: String},
        contact     : {type: String},
        salaryMin   : {type: Number},
        salaryMax   : {type: Number},
        tags        : {type: Array}
    }
    
});

module.exports = mongoose.model('Offer', offerSchema);