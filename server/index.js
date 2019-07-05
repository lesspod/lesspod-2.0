const express = require("express");
const consola = require("consola");
const { Nuxt, Builder } = require("nuxt");
const cors = require("cors");
const bodyParser = require("body-parser");
const initDb = require("./db");

const authMiddleware = require("./middlewares/authMiddleware");

const app = express();
const host = process.env.HOST || "127.0.0.1";
const port = process.env.PORT || 3000;

const dev = process.env.NODE_ENV !== "production";


app.set("port", port);

// Import and Set Nuxt.js options
let config = require("../nuxt.config.js");
config.dev = !(process.env.NODE_ENV === "production");

config.dev = false;
async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config);

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt);
    await builder.build();
  }
  initDb(); 
  
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

app.use(cors());

  app.use(bodyParser.json())

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });

  app.use('/api',routes);



  

  
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
  // app.use(nuxt.render);

  // Listen the server
  // app.listen(port, host);
  // consola.ready({
  //   message: `Server listening on http://${host}:${port}`,
  //   badge: true
  // });

  module.exports = app;
}
start();


