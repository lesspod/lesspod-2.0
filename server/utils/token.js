const jwt = require('jsonwebtoken');
const config = require('../../config');

const secret = config.jwtSecret;

const generateToken = payload =>
  jwt.sign(payload, secret, { expiresIn: '30d' });

const decodeToken = token => jwt.verify(token, secret);

module.exports = {
  generateToken,
  decodeToken
};
