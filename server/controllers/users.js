const express = require('express');
const bcrypt  = require('bcrypt-nodejs');
const User    = require('../models/User'); 

const router = express.Router();




router.post('/new', (req, res, next) => {

    bcrypt.hash(req.body.password, null, null, function(err, hash) {
    
      const userData = {
        email     : req.body.email,
        password  : hash
      }      
      
      let newUser = new User(userData);

      newUser.save((err) => {
        if(err.code === 11000) {
          res.json({message: "Ten email jest już zajęty."});
        } else if(err) {
          res.send({message: "Nie udało się założyc konta."});
        } else {
          res.send({message: "Pomyślnie założono konto."});
        }
      });
    });
});


module.exports = router;
