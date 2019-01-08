var mongoose = require('mongoose');
var bcrypt   = require('bcrypt');

// define the schema for our user model
var newGame = mongoose.Schema({

        park : String,
        date : Date,
        time : String,
        attending: Number
    
});

module.exports = mongoose.model('Game', newGame);
