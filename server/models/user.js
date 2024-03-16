const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, default: 'user' },
  coursesBought: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
  location: {
    type: { type: String, default: 'Point' }, // Specify the type as 'Point'
    coordinates: { type: [Number], default: [0, 0] }, // Default coordinates
  },
});

// Hash and salt the user's password before saving it
userSchema.pre('save', function (next) {
  const user = this;
  if (!user.isModified('password')) return next();
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

// Compare the user's password with the hashed password
userSchema.methods.comparePassword = function (candidatePassword) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
      if (err) return reject(err);
      resolve(isMatch);
    });
  });
};

module.exports = mongoose.model('User', userSchema);
