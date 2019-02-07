importScripts('/_nuxt/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/_nuxt/04481087083e3529fa34.js",
    "revision": "8934eb83d586cb4ad1c16167578aed6f"
  },
  {
    "url": "/_nuxt/1cdef7c811c813987425.js",
    "revision": "536fd8bfdeb61d424182fe695fe8737e"
  },
  {
    "url": "/_nuxt/5773f50b60d0dca65973.js",
    "revision": "f1fd6e86f0daccb60d3d9d722ef16780"
  },
  {
    "url": "/_nuxt/651d10ccdebf038ab1e5.js",
    "revision": "f7fc5e9c26ea60dc4d7254fafb98b4b5"
  },
  {
    "url": "/_nuxt/9f78be27adbf54fe9a30.js",
    "revision": "dc9750de0000e60c95103c058ec13518"
  },
  {
    "url": "/_nuxt/bc710d9fef346dfeb4e4.js",
    "revision": "453e517c146181bfcaf9a910b5eeb1e9"
  },
  {
    "url": "/_nuxt/e7cb46712d2801ee7cdd.js",
    "revision": "a660e7a6075af792ba284c4c75eef771"
  },
  {
    "url": "/_nuxt/ecdcb8a3500c81522337.js",
    "revision": "9ca805c041ddac3e706ef8a4206fe6f2"
  },
  {
    "url": "/_nuxt/f27afe66689e39380e69.js",
    "revision": "54ae6df69aa0ba16d66b950391d7ada3"
  }
], {
  "cacheId": "lesspod-2.0",
  "directoryIndex": "/",
  "cleanUrls": false
})

workbox.clientsClaim()
workbox.skipWaiting()

workbox.routing.registerRoute(new RegExp('/_nuxt/.*'), workbox.strategies.cacheFirst({}), 'GET')

workbox.routing.registerRoute(new RegExp('/.*'), workbox.strategies.networkFirst({}), 'GET')
