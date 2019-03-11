const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  fullname: String,
  username: { type: String, index: { unique: true, dropDups: true } },
  email: { type: String, unqiue: true, dropDups: true },
  password: String,
  createdAt: Number,
  updatedAt: Number
});

class User {
  constructor() {
    this.User = mongoose.model("user", userSchema, "user");
  }

  create(user) {
    let now = Date.now();
    user.createdAt = now;
    user.updatedAt = now;

    let newUser = new this.User(user);
    return newUser.save();
  }

  getByEmail(email) {
    console.log('finding user with email: ' + email);
    return this.User.findOne({ 'email': email.trim() });
  }
}

module.exports = User;
