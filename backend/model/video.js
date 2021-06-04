let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let videoSchema = new Schema({
    'title':String,
    'url':String,
    'description':String
},{versionKey:false});

module.exports = mongoose.model('video',videoSchema,'videos');
/*
  video  => Name of the Model.
  videoSchema => Schema of the Model which represents the database collection
  videos      => Name of the database collections.
  
*/