const pkg = require("./package")
const webpack = require('webpack')
module.exports = {
  mode: "universal",
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000'
  },
  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: pkg.description }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: 'stylesheet',
        href:
          'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css'
      },
      {
        rel: 'stylesheet',
        href:
          'https://stackpath.bootstrapcdn.com/bootswatch/4.1.2/litera/bootstrap.min.css'
      },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Lustria'
      },
      // {
      //   rel: 'stylesheet',
      //   href:
      //     'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'
      // },
      // {
      //   rel: "stylesheet",
      //   href:
      //     "https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
      // },
      // {
      //   rel: "stylesheet",
      //   href:
      //     "https://stackpath.bootstrapcdn.com/bootswatch/4.1.2/journal/bootstrap.min.css"
      // },
      {
        rel: "stylesheet",
        href:
          "https://use.fontawesome.com/releases/v5.7.1/css/all.css"
      }
    ],
    script: [
      {
        src: "https://code.jquery.com/jquery-3.3.1.min.js",
        type: "text/javascript"
      },
      {
        src:
          "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js",
        type: "text/javascript"
      },
      {
        src:
          "https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js",
        type: "text/javascript"
      }
    ]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },

  /*
   ** Global CSS
   */
  // css: ['~/assets/css/tailwind.css'],

  css: [
    'quill/dist/quill.snow.css',
    'quill/dist/quill.bubble.css',
    'quill/dist/quill.core.css',
    '~assets/style/main.css'
  ],

  transition : {
    name : 'fade',
    mode : 'out-in'
  },

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: '~plugins/nuxt-quill-plugin.js', ssr: false },
    { src: '~/plugins/vuex-persist', ssr: false },
    { src: '~/plugins/vue-sidebar-menu', ssr: false },
    { src: '~/plugins/vue-moment', ssr: true },
    {src: '~/plugins/toggle-button.js', ssr: false}
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    ["@nuxtjs/axios"],
    ["bootstrap-vue/nuxt", { css: false }],
    ["@nuxtjs/pwa"],
    ['@nuxtjs/auth'],
    ['@nuxtjs/toast'],
    ['nuxt-babel']
  ],
  toast: {
    position: 'top-center'
  },
  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: '/api/login', method: 'post', propertyName: 'token' },
          logout: { url: '/api/logout', method: 'post' },
          user: { url: '/api/user', method: 'get', propertyName: 'user' }
        },
        // tokenRequired: true,
        // tokenType: 'bearer',
      }
    }
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/
        });
      }
    }
  }
};
