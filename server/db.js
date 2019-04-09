require("dotenv").config();
const mongoose = require("mongoose");

let uri = process.env.DB_URI || 'mongodb://localhost:27017/';
module.exports = () => {
  // mongoose.connect(uri)

  mongoose.connect(uri, { useNewUrlParser: true, dbName: 'lptest', keepAlive: true, poolSize: 5 }, (err, res) => {
    if (err) throw err;
    console.log("Database online");
  });

  mongoose.connection.on("error", err => {
    console.log("mongo connection error", err);
  });

  mongoose.connection.once("open", () => {
    console.log("connected to mongo db");
  });
};
