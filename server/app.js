
//this file is for testing purposes only!!!!!!!

const express = require("express");
const bodyParser = require("body-parser");
const initDb = require("./db");
const cors = require("cors");
const consola = require("consola");

const authMiddleware = require("./middlewares/authMiddleware");
const app = express();
const host = process.env.HOST || "127.0.0.1";
const port = process.env.PORT || 3000;

const dev = process.env.NODE_ENV !== "production";
app.set("port", port);
initDb();

const routes = require("./routes");

  app.use("/api", [cors(), bodyParser.json()], routes);

  app.get('/hello', (req, res) => {
    console.log('in hello route');
    res.status(200).json({hello : 'hello'});
  })
  
  app.listen(port, host);
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  });

  module.exports = app;





