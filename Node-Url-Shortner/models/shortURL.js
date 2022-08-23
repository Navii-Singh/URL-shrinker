const mongoose = require('mongoose');
const shortId = require('shortid')
const shortUrl = new mongoose.Schema({
    full:{
        type:String,
        required:true
    },
    short:{
        type:String,
        required:true,
        default:shortId.generate
    },
    click:{
        type:Number,
        default:0
    }
    
  });
  module.exports = mongoose.model('shortURL', shortUrl);