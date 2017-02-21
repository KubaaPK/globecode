var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const jwt     = require('jsonwebtoken');
const cors = require('cors');

const db = require('./config/db');
const auth = require('./config/auth');
const users = require('./controllers/users');
const offers = require('./controllers/offers');

// db connection
db.connect();



var app = express();

app.set('authSecretVariable', auth.secret); 
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use(cors());

function authMiddlewre(req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {

      jwt.verify(token, app.get('authSecretVariable'), function(err, decoded) {      
        if (err) {
          return res.json({ success: false, message: 'Failed to authenticate token.' });    
        } else {
          // if everything is good, save to request for use in other routes
          req.decoded = decoded;    
          next();
        }
      });

    } else {

      // if there is no token
      // return an error
      return res.status(403).send({ 
          success: false, 
          message: 'No token provided.' 
      });
      
    };
}

app.use('/api/offer/new', (req, res, next) => {
  authMiddlewre(req, res, next);
});
app.use('/api/offer/edit', (req, res, next) => {
  authMiddlewre(req, res, next);
});
app.use('/api/offer/delete', (req, res, next) => {
  authMiddlewre(req, res, next);
});




// routes
app.use('/api/users/', users);
app.use('/api/offer/', offers);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
