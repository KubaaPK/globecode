const express = require('express');
const router  = express.Router();

const Offer   = require('../models/Offer'); 

/*
    Add new offer to database
*/
router.post('/new', (req, res, next) => {
    let data = req.body;

    let fields = {
        fields: data
    } 
    console.log(fields);
    let newOffer = new Offer(fields);
    newOffer.save((err) => {
        if(err) {
            res.json({message: "Nie udało się dodać oferty."});
        } else {
            res.json({message: "Pomyślnie dodano ofertę."});
        }
    })
});

/*
    Get all offers as a json object
*/
router.get('/all', (req, res, next) => {
    Offer.find({}, (err, offers) => {
        if(err) {
            res.json({message: "Nie udało się załadować ofert."});
        } else {
            res.json(offers);
        }
    })
});


router.post('/search', (req, res, next) => {
    let filters = req.body;
    Array.prototype.clean = function(deleteValue) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == deleteValue) {         
        this.splice(i, 1);
        i--;
        }
    }
    return this;
    };
    filters.clean(null);
    console.log(filters);
    if(filters.length === 0) {
        Offer.find({}, (err, offers) => {
            if(err) {
                res.json({message: "Nie udało się załadować ofert."});
            } else {
                res.json(offers);
            }
        })
    } else {
        Offer.find({"fields.tags": {$all: filters}}, (err, offers) => {
            if(err){
                console.log(err);
            } else {
                res.json(offers);
            }
        })
    }


});



module.exports = router;