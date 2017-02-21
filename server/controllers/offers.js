const express = require('express');
const router  = express.Router();

const Offer   = require('../models/Offer'); 

/*
    Add new offer to database
*/

router.post('/new', (req, res, next) => {
    let data = req.body;
    let newOffer = new Offer(data);
    newOffer.save((err) => {
        if(err) {
            console.log(err);
            res.json({message: "Nie udało się dodać oferty."});
        } else {
            res.json({message: "Pomyślnie dodano ofertę."});
        }
    });
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

/*
    Get exact offer details by given ID
*/

router.get('/detail/:id', (req, res, next ) => {
    
    Offer.findOne({_id: req.params.id}, (err, offer ) => {
        if(err) {
            console.log(err);
        } else {
            res.json(offer);
        }
    })
});


/*
    Search offers by params given by post request
*/
router.post('/search', (req, res, next) => {
    let filters = [];
    for(var key in req.body) {
        filters.push(req.body[key]);
        
    }

    if(filters.length === 0) {
        Offer.find({}, (err, offers) => {
            if(err) {
                res.json({message: "Nie udało się załadować ofert."});
            } else {
                res.json(offers);
            }
        })
    } else {
        Offer.find({"tags": {$all: filters}}, (err, offers) => {
            if(err){
                console.log(err);
            } else {
                res.json(offers);
            }
        })
    }


});

router.get('/amount', (req, res, next) => {
    Offer.find({}, (err, offer) => {
        if(err) {
            console.log(err);
        } else {
            const states = ["Frontend", "Backend", "Design", "Tester", "Management"],
                  shifts = ["Pełen etat", "Niepełny etat", "Kontrakt", "Freelance", "Staż"],
                  compSize = ["1-10", "11-50", "51-100", "101-500", "500+"];
            
            amounts = {
                "Frontend": 0,
                "Backend": 0,
                "Design": 0,
                "Tester": 0,
                "Management": 0,
                "Fulltime": 0,
                "Parttime": 0,
                "Contract": 0,
                "Freelance": 0,
                "Practice": 0,
                "cs110": 0,
                "cs1150": 0,
                "cs51100": 0,
                "cs101500": 0,
                "cs501": 0
            }

            for (let i = 0; i< offer.length; i++) {
                if(offer[i].state === states[0]) {
                    amounts.Frontend++;
                }
                if(offer[i].state === states[1]) {
                    amounts.Backend++;
                }
                if(offer[i].state === states[2]) {
                    amounts.Design++;
                }
                if(offer[i].state === states[3]) {
                    amounts.Tester++;
                }
                if(offer[i].state === states[4]) {
                    amounts.Management++;
                }

                if(offer[i].shift === shifts[0]) {
                    amounts.Fulltime++;
                }
                if(offer[i].shift === shifts[1]) {
                    amounts.Parttime++;
                }
                if(offer[i].shift === shifts[2]) {
                    amounts.Contract++;
                }
                if(offer[i].shift === shifts[3]) {
                    amounts.Freelance++;
                }
                if(offer[i].shift === shifts[4]) {
                    amounts.Practice++;
                }


                if(offer[i].companySize === compSize[0]) {
                    amounts.cs110++;
                }
                if(offer[i].companySize === compSize[1]) {
                    amounts.cs1150++;
                }
                if(offer[i].companySize === compSize[2]) {
                    amounts.cs51100++;
                }
                if(offer[i].companySize === compSize[3]) {
                    amounts.cs101500++;
                }
                if(offer[i].companySize === compSize[4]) {
                    amounts.cs501++;
                }

            }

            res.json(amounts);
        }
    })
});


/*
    Get all offers posted by user.
*/
router.get('/myOffers/:id', (req, res, next) => {
    Offer.find({})
         .populate({
             path: '_creator',
             select: '-password -email'
         })
         .exec((err, offers) => {
            if(err) {
                console.log(err);
            } else {
                res.json(offers);
            }
    })
});


router.post('/delete', (req, res, next) => {
    let data = req.body;   
    
    Offer.remove({_id: data.id}, (err) => {
        if(err) {
            console.log(err);
        } else {
            res.json({success: true, message: "Usunięto ofertę."});
        }
    })
});

router.put('/edit', (req, res, next) => {
    const data = req.body;
    Offer.update({_id: data.id}, data, {upsert: false}, (err) => {
        if(err) {
            console.log(err);
        } else {
            console.log('Pomyślnie zaaktualizowano ofertę.');
            res.json({success: true, message: "Pomyślnie zaaktualizowano ofertę."});
        }
    })
})


module.exports = router;