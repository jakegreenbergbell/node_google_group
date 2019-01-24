var express    = require('express')
var app = express()

var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var Game = require('./app/models/game');

// Connect to DB
//var configDB = require('./config/database.js');
mongoose.connect('mongodb://jakegb:password1@ds139944.mlab.com:39944/pickupbasketball');

// set up our express application
app.set('view engine','ejs');
app.use(express.static('public'));
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms

// required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
// load our routes and pass in our app and fully configured passport
require('./app/routes.js')(app, passport, Game);
require('./config/passport')(passport); // pass passport for configuration

//start server
var port = process.env.PORT || 80
app.listen(port, () => {
    console.log('meow')
})
