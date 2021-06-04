let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let usersSchema = new Schema({
    'name':String,
    'email':String,
    'pass1':String
},{versionKey:false});

module.exports = mongoose.model('users',usersSchema,'users');
/*
  users  => Name of the Model.
  userSchema => Schema of the Model which represents the database collection
  users      => Name of the database collections.
  
*/