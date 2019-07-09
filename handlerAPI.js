const serverless = require("serverless-http");

const server = require('./server/index')

exports.renderAPI = serverless(server); 