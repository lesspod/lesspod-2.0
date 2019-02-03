const joi = require("joi");

const signupSchema = {
  username: joi.string().min(4),
  email: joi.string().email(),
  password: joi.string().min(7)
};

module.exports = {
  signupSchema
};
