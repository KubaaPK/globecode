const express = require('express');
const app = express();
const bcrypt  = require('bcrypt-nodejs');
const jwt     = require('jsonwebtoken');
const router  = express.Router();
const auth = require('./../config/auth');
const User    = require('../models/User'); 
app.set('authSecretVariable', auth.secret); 


const JWTAuth = ((req, res, next) => {

  const token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, app.get('authSecretVariable') , (err, decoded) => {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        req.decoded = decoded;    
        next();
      }
    });

  } else {

    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });
    
  }
});



router.post('/new', (req, res, next) => {

    bcrypt.hash(req.body.password, null, null, function(err, hash) {
    
      const userData = {
        email     : req.body.email,
        password  : hash
      }      
    
      let newUser = new User(userData);

      newUser.save((err) => {
        if(err) {
          if(err.code === 11000){
            res.json({message: "Email znajduje się w bazie."});
          } else {
            res.json({message: "Nie udało się zalożyc konta."});
          }
        } else {
          const userDataToSent = {
            email: userData.email,
            id: userData._id
          }
          const TOKEN = jwt.sign(newUser, app.get('authSecretVariable'), {
              expiresIn: 60*60*4
            });
            res.json({
              success: true,
              token: TOKEN,
              user: userDataToSent
            });
        }
      })

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

      bcrypt.compare(loginData.password, user.password, (err, auth) => {
        if(err) {
          console.log(err);
        } else {
          if(auth) {
            const userDataToSent = {
              email: user.email,
              id: user._id
            }
            const TOKEN = jwt.sign(user, app.get('authSecretVariable'), {
              expiresIn: 60*60*24
            });
            res.json({
              success: true,
              token: TOKEN,
              user: userDataToSent
            });
          } else {
            res.json({message: "Błędny adres email lub hasło."});
          }
        }
      })
    }
  });

});




module.exports = router;
