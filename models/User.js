const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  created_at: Date
});

UserSchema.pre('save', function(next) {
  let user = this;

  let date = new Date();
  
  if ( !user.created_at ) {
    user.created_at = date;
  }

  bcrypt.hash(user.password, bcrypt.genSaltSync(10))
    .then(hash => {
      user.password = hash;
      next();
    });  
});

UserSchema.methods.comparePassword = function (pass) {
  return bcrypt.compare(pass, this.password);
};

module.exports = mongoose.model('User', UserSchema);
