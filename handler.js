const { Nuxt } = require("nuxt");
const serverless = require("serverless-http");
const express = require("express");
const nuxtConfig = require("./nuxt.config");
// const binaryMimeTypes = require('./binariMimeTypes')
const cors = require("cors");




const app = express();



// app.use(bodyParser.json())

// app.use('/api',routes);

// init();
const config = {
  ...nuxtConfig,
  dev: false
};

const nuxt = new Nuxt(config);

  // init();

  // app.use("/api", routes);

  // app.get('/hello', (req, res) => {
  //   res.send('check')
  // })

// ////////////////////////////////////////////////////////////////////

// const PostModel = require("./server/models/post");

// app.get("/post3", async (req, res) => {
//   try {
//     let { limit, skip } = req.query;
//     let Post = new PostModel();
//     let result = await Post.getPublishedPosts({ limit, skip });
//     // console.log("result", result);
//     console.log("checking the session",req.session);
//     res.send(result);
//   } catch (e) {
//     res.send(e);
//   }
// });

// ///////////////////////////////////////////



// app.get('/favicon.ico', (req, res) => {
//   res.redirect('/dev/static/favicon.ico')
// })



app.use("/_nuxt", (req, res) => {

  app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
  });
  res.redirect(process.env.ASSETS_BUCKET_URL + req.path)
});

app.use("/static", (req, res) =>{
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });

  res.redirect(process.env.STATIC_BUCKET_URL + req.path)
});
app.use(nuxt.render);

exports.renderNUXT = serverless(app);

const server = require('./server/index')

exports.renderAPI = serverless(server); 
