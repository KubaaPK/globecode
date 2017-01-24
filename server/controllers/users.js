const express = require('express');
const bcrypt  = require('bcrypt-nodejs');
const jwt     = require('jsonwebtoken');
const router  = express.Router();

const User    = require('../models/User'); 





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


router.post('/authenticate', (req, res, next) => {
  
  const loginData = {
    email     : req.body.email,
    password  : req.body.password
  }


  User.findOne({email: loginData.email}, (err, user) => {
    if(err) {
      console.log(err);
    }

    if(!user) {
      res.json({message: "Błędny adres email lub hasło."});
    } else {
      console.log(user);
      bcrypt.compare(loginData.password, user.password, (err, auth) => {
        if(err) {
          console.log(err);
        } else {
          if(auth) {
            const TOKEN = jwt.sign(user, "asdasALSDJaklsjdlajlkj312lk3jLASKDJ", {
              expiresIn: 60*60*24
            });
            res.json({
              success: true,
              token: TOKEN
            });
          }
        }
      })
    }

  });

});

module.exports = router;
