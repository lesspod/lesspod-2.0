require('dotenv').config()
const env = process.env.NODE_ENV

module.exports = {
  api:
    env === 'local'
      ? 'http://localhost:3000/api'
      : 'https://arbxas24u6.execute-api.us-east-1.amazonaws.com/development/api',
  jwtSecret: process.env.JWT_SECRET || 'pink_pikachu'
}
