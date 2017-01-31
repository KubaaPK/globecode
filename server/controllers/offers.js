const express = require('express');
const router  = express.Router();

const Offer   = require('../models/Offer'); 

/*
    Add new offer to database
*/
router.post('/new', (req, res, next) => {
    const data = req.body;
    const newOffer = new Offer(data);

    newOffer.save((err) => {
        if(err) {
            res.json({message: "Nie udało się dodać oferty."});
        } else {
            res.json({message: "Pomyślnie dodano ofertę."});
        }
    })
});

/*
    Get all offers as json object
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





module.exports = router;