require("dotenv").config();
const env = process.env.NODE_ENV;

module.exports = {
  api:
    env === "local"
      ? "http://localhost:3000/api"
      : "http://0.0.0.0:3000/api",
  jwtSecret: process.env.JWT_SECRET || "pink_pikachu"
};
