![Lesspod Logotype](https://github.com/Tobaloidee/lesspod/blob/master/images/readme-logo.png)

# lesspod-2.0

> Lesspod-2.0 built with vue/nuxt/serverless (work in progress)

## Why Lesspod?

In 2015, carbon emissions from data centers exceeded the carbon emissions from air travel. There are 16 million websites being added to the Internet every month. Most websites require servers to host and most of the servers are underutilized. There are a lot of unused server resources costing us carbon emissions and money. We can reverse this damage by going serverless.

Lesspod's mission is to transition the Internet from server architecture to serverless architecture as soon as possible. To that end, we're building it as an open source project that anyone can utilize.

Our goal is to make it as simple as possible to host serverless websites and blogs. As we build Lesspod, we stare at the possibility of the serverless Internet.

[Discussion at Reddit Opensource](https://www.reddit.com/r/opensource/comments/ap1pm4/lesspod_serverless_cms_using_vuejsnuxtjs_and/)

## Static websites vs Serverless websites

Static websites can also be deployed without servers (VMs or bare metal) and can be considered as a serverless website. The key difference from development perspective is that a serverless website built with Lesspod can be a dynamic serverless website.

## Themes Support (Bootstrap themes + Tailwind CSS)

We know that when it comes to building websites, themes do speed up the development effort. Currently, we support tailwind css and bootstrap both. Thousands of Bootstrap 4 themes are available online and can be quickly integrated using nuxt.config.js.

For example following code illustrates adding 'Journal' Bootswatch theme.

```
 head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css'
      },
      {
        rel: 'stylesheet',
        href:
          'https://stackpath.bootstrapcdn.com/bootswatch/4.1.2/journal/bootstrap.min.css'
      },
      {
        rel: 'stylesheet',
        href:
          'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'
      }
    ]
 }
 modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    ['@nuxtjs/axios'],
    ['bootstrap-vue/nuxt', { css: false }],
    ['@nuxtjs/pwa']
 ]
```

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run sls:local  // running serverless in offline mode

# generate static project
$ npm run generate
```

For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).
