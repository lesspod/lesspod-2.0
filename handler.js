const { Nuxt } = require("nuxt");
const serverless = require("serverless-http");
const express = require("express");
const nuxtConfig = require("./nuxt.config");
// const binaryMimeTypes = require('./binariMimeTypes')
const cors = require("cors");




const app = express();

app.use(cors())


// app.use(bodyParser.json())

// app.use('/api',routes);

// init();
const config = {
  ...nuxtConfig,
  dev: false
};

const nuxt = new Nuxt(config);

app.use("/_nuxt", (req, res) => {

  app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
  });

  console.log('before redirecting to s3        !!!!!!!!!!!!!!!!!!!!!!!!!!!!' + req.path)
  res.redirect(process.env.ASSETS_BUCKET_URL + req.path)
});

app.use("/static", (req, res) =>{
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });

  res.redirect(process.env.STATIC_BUCKET_URL + req.path)
});

handlesRequest = async (req, res) => {
  let context = {}
  let { html } = await nuxt.renderRoute('/', context)

  res.send(html);
}

handlesRequestAdmin = async (req, res) => {
  let context = {}
  let { html } = await nuxt.renderRoute('/admin', context)

  res.send(html);
}

handlesRequestBlog = async (req, res) => {
  let context = {}
  let { html } = await nuxt.renderRoute('/blog', context)

  res.send(html);
}

handlesRequestPages = async (req, res) => {
  let context = {}
  let { html } = await nuxt.renderRoute('/pages', context)

  res.send(html);
}

handlesRequestLogin = async (req, res) => {
  let context = {}
  let { html } = await nuxt.renderRoute('/login', context)

  res.send(html);
}

handlesRequestSignup = async (req, res) => {
  let context = {}
  let { html } = await nuxt.renderRoute('/signup', context)

  res.send(html);
}

handlesRequestPostId= async (req, res) => {
  let context = {}
  let { html } = await nuxt.renderRoute('/post/_id', context)

  res.send(html);
}

handlesRequestMenuId = async (req, res) => {
  let context = {}
  let { html } = await nuxt.renderRoute('/menu/_id', context)

  res.send(html);
}


app.get('/', handlesRequest);

app.get('/admin', handlesRequestAdmin);


app.get('/blog', handlesRequestBlog);

app.get('/pages', handlesRequestPages);

app.get('/login', handlesRequestLogin);

app.get('/signup', handlesRequestSignup);

app.get('/post/:id', handlesRequestPostId);

app.get('/menu/:id', handlesRequestMenuId);

app.use(nuxt.render);

exports.renderNUXT =serverless(app);



