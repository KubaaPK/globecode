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

    // for (let i = 0; i<3;i++) {
    //     filters.push(req.body[i]);
    // }

    // Array.prototype.clean = function(deleteValue) {
    // for (var i = 0; i < this.length; i++) {
    //     if (this[i] == deleteValue) {         
    //     this.splice(i, 1);
    //     i--;
    //     }
    // }
    // return this;
    // };
    // filters.clean(null);
    // console.log(filters);
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
                if(offer[i].fields.state === states[0]) {
                    amounts.Frontend++;
                }
                if(offer[i].fields.state === states[1]) {
                    amounts.Backend++;
                }
                if(offer[i].fields.state === states[2]) {
                    amounts.Design++;
                }
                if(offer[i].fields.state === states[3]) {
                    amounts.Tester++;
                }
                if(offer[i].fields.state === states[4]) {
                    amounts.Management++;
                }

                if(offer[i].fields.shift === shifts[0]) {
                    amounts.Fulltime++;
                }
                if(offer[i].fields.shift === shifts[1]) {
                    amounts.Parttime++;
                }
                if(offer[i].fields.shift === shifts[2]) {
                    amounts.Contract++;
                }
                if(offer[i].fields.shift === shifts[3]) {
                    amounts.Freelance++;
                }
                if(offer[i].fields.shift === shifts[4]) {
                    amounts.Practice++;
                }


                if(offer[i].fields.companySize === compSize[0]) {
                    amounts.cs110++;
                }
                if(offer[i].fields.companySize === compSize[1]) {
                    amounts.cs1150++;
                }
                if(offer[i].fields.companySize === compSize[2]) {
                    amounts.cs51100++;
                }
                if(offer[i].fields.companySize === compSize[3]) {
                    amounts.cs101500++;
                }
                if(offer[i].fields.companySize === compSize[4]) {
                    amounts.cs501++;
                }

            }

            res.json(amounts);
        }
    })
});







module.exports = router;