var db = require('../config');
var mongoose = require('mongoose');
var crypto = require('crypto');
var Promise = require('bluebird');

var Schema = mongoose.Schema;
var urlSchema = new Schema({
  id: { type: Number, required: true, unique: true },
  url: { type: String, required: true, unique: true },
  baseUrl: { type: String, required: true },
  code: String,
  title: String,
  created_at: Date,
  updated_at: Date
});
urlSchema.pre('save', function(next) {
  var shasum = crypto.createHash('sha1');
  shasum.update(this.url);
  this.code = shasum.digest('hex').slice(0, 5);
});


var Link = mongoose.model('url', urlSchema);



module.exports = Link;