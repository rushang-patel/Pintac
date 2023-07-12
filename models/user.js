const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    userName: {
        type: String,
        required: true 
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true

});


//Hash the password before saving to the database
//'pre(save)' is used to execute the passworld hashing  logic before saving a user instance to DB.
//'bcrypt.genSalt' function generates a salt
//bcrypt.hash function applies the salt to the provided password to generate a hash
//resulting hash is then assigned to the password field of the user instance
userSchema.pre('save', function (next) {
  const user = this;

  if (!user.isModified('password')) {
    return next();
  }

  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }

    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }

      user.password = hash;
      next();
    });
  });
});

const User = mongoose.model('User', userSchema);

module.exports = User;
