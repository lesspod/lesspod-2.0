const express = require("express");
const consola = require("consola");
const { Nuxt, Builder } = require("nuxt");
const cors = require("cors");
const bodyParser = require("body-parser");
// const session = require('express-session');
// const session = require("cookie-session");
const mongoose = require("mongoose");
const initDb = require("./db");
const cookieparser = require('cookieparser');

const authMiddleware = require("./middlewares/authMiddleware");

const app = express();
const host = process.env.HOST || "127.0.0.1";
const port = process.env.PORT || 3000;

const dev = process.env.NODE_ENV !== "production";

// import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'

app.set("port", port);

// Import and Set Nuxt.js options
let config = require("../nuxt.config.js");
config.dev = !(process.env.NODE_ENV === "production");

// config.dev = false;

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config);

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt);
    await builder.build();
  }
  initDb();

  app.get("/p/:id", (req, res) => {
    const actualPage = "/post";
    const queryParams = { id: req.params.id };
    app.render(req, res, actualPage, queryParams);
  });
  
  
  
  // app.get('*', (req, res) => nuxt(req, res))


  // Sessions to create `req.session`
  // app.use(session({
  //   secret: 'super-secret-key',
  //   resave: true,
  //   saveUninitialized: false,
  //   cookie: { maxAge: 1000 * 60 * 60 }
  // }));

  
  // app.use(session({
  //   name : 'session',
  //   secret: 'super-secret-key',
  //   maxAge: 1000 * 60 * 60 
  //   }));

  


  const routes = require("./routes");

  app.use("/api", [cors(), bodyParser.json()], routes);

  console.log('API routes: ' + JSON.stringify(routes.stack));
  console.log('Api routes', routes);

  
  // POST `/api/logout` to log out the user and remove it from the `req.session`

  
  app.post('/api/logout', function (req, res) {
    delete req.headers
    console.log('logged out!!!!')
    res.json({ ok: true })
  })
  

  app.get('/api/current_user', authMiddleware,(req, res) => {
    try{
      console.log(auth, 'current')
      res.send(auth);
    } catch(e){
      console.log(e);
      res.send(e);
    }
  });

  // Give nuxt middleware to express
  app.use(nuxt.render);

  // Listen the server
  // app.listen(port, host);
  // consola.ready({
  //   message: `Server listening on http://${host}:${port}`,
  //   badge: true
  // });

  module.exports = app;
}
start();



// const express = require('express')
// const next = require('next')
// const cors = require('cors')
// const bodyParser = require('body-parser')
// const routes = require('./server/routes')
// const mongoose = require('mongoose')
// const initDb = require('./db')

// const port = parseInt(process.env.PORT, 10) || 3000
// const dev = process.env.NODE_ENV !== 'production'
// const app = next({ dev })
// const handle = app.getRequestHandler()

// const createServer = () => {
//   const server = express()

//   initDb()
//   server.use(bodyParser.json())
//   server.use(cors())
//   server.use('/api', routes)

//   server.get('/p/:id', (req, res) => {
//     const actualPage = '/post'
//     const queryParams = { id: req.params.id }
//     app.render(req, res, actualPage, queryParams)
//   })
//   server.get('*', (req, res) => handle(req, res))

//   return server
// }

// const server = createServer()

// if (!process.env.LAMBDA) {
//   app.prepare().then(() => {
//     server.listen(port, err => {
//       if (err) throw err
//       console.log(`Ready on http://localhost:${port}`)
//     })
//   })
// }

// exports.app = app
// exports.server = server
