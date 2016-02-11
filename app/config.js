var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');


mongoose.connect('mongodb://localhost:27017/shortly');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongoDB connection error:'));
// db.once('open', function() {
  // we're connected!
  // var Schema = mongoose.Schema;
  // module.exports.urlSchema = new Schema({
  //   id: { type: Number, required: true, unique: true },
  //   url: { type: String, required: true, unique: true },
  //   baseUrl: { type: String, required: true },
  //   code: String,
  //   title: String,
  //   created_at: Date,
  //   updated_at: Date
  // });
  // urlSchema.methods.initialize = function(model, attrs, options) {
  //   var shasum = crypto.createHash('sha1');
  //   shasum.update(model.get('url'));
  //   this.code = shasum.digest('hex').slice(0, 5);
  // };

  // module.exports.userSchema = new Schema({
  //   id: Number,
  //   username: { type: String, required: true, unique: true },
  //   password: { type: String, required: true },
  //   created_at: Date,
  //   updated_at: Date
  // });
  // userSchema.methods.comparePassword = function(attemptedPassword, callback) {
  //   bcrypt.compare(attemptedPassword, this.password, function(err, isMatch) {
  //     callback(isMatch);
  //   });
  // };
  // userSchema.methods.hashPassword = function() {
  //   var cipher = Promise.promisify(bcrypt.hash);
  //   return cipher(this.get('password'), null, null).bind(this)
  //     .then(function(hash) {
  //       this.set('password', hash);
  //     });
  // };
module.exports = db;
// });

