const joi = require("joi");

const loginSchema = {
  username: joi.string().min(4),
  password: joi.string().min(5)
};

const signupSchema = {
  fullname: joi.string().min(4),
  username: joi.string().min(4),
  email: joi.string().email(),
  password: joi.string().min(5)
};

module.exports = {
  loginSchema,
  signupSchema
};
