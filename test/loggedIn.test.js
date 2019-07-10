//testing authenticated routes!!!!

import test from 'ava'
const { Nuxt, Builder } = require("nuxt");
import { resolve } from 'path'


// We keep a reference to Nuxt so we can close
// the server at the end of the test

let nuxt = null

// Init Nuxt.js and start listening on localhost:4000
test.before('Init Nuxt.js', async t => {
  const rootDir = resolve(__dirname, '../')
  let config = {}
  try { config = require(resolve(rootDir, 'nuxt.config.js')) } catch (e) { }
  config.rootDir = rootDir // project folder
  config.dev = false // production build
  config.mode = 'universal' // Isomorphic application
  config.env.NODE_ENV = 'test'
  nuxt = new Nuxt(config)

  await new Builder(nuxt).build()

  nuxt.listen(4000, 'localhost')
})
test('Route /post/new exits and render HTML', async t => {
  let context = {}
  const { html } = await nuxt.renderRoute('/post/new', context)

  console.log(html)
  
  t.true(html.includes('<label for="inline-post-title" class="block text-grey font-bold mb-0 md:text-right md:mb-0 pr-4" data-v-5a632542>Title</label>'))
  t.true(html.includes(`<label for="content" class="mb-0 mt-1" data-v-5a632542>Content</label>`))
  
})


test('Route /admin exits and render HTML', async t => {
  let context = {}
  const { html } = await nuxt.renderRoute('/admin', context)
  t.true(html.includes('<h4 class="w-full text-center pt-1 pb-1">Dashboard</h4>'))
  
})


test('Route /post/all exits and render HTML', async t => {
  let context = {}
  const { html } = await nuxt.renderRoute('/post/all', context)
  
  t.true(html.includes('<h4 class="w-full text-center pt-1 pb-1">Admin Posts</h4>'))
  t.true(html.includes(`</p> <div class="d-flex justify-content-around"><a href="/post/edit/5d1f3233bc015e5b5115d490" class="btn btn-success">Edit</a> <button type="button" class="btn btn btn-danger btn-secondary">Delete</button></div> <br> <div class="d-flex justify-content-around"><toggle-button value="true" width="120" height="35" sync="true" labels="[object Object]"></toggle-button></div></div><!----><!----></article><article class="card mb-2" style="max-width:15rem;min-width:12rem;"><!----><!----><div class="card-body"><h4 class="card-title">zsdc</h4><!----><p class="card-text block-ellipsis">`))
  
})



test('Route /trash exits and render HTML', async t => {
  let context = {}
  const { html } = await nuxt.renderRoute('/trash', context)

  t.true(html.includes(`<h4 class="w-full text-center pt-1 pb-1">Trashed Items</h4>`))
  t.true(html.includes('<h5 class="w-full text-center pt-1 pb-1">Trashed Posts (temp content)</h5>'))
  
  t.true(html.includes(`<h4 class="card-title">testing sampark post</h4>`))
  
  t.true(html.includes(`<button type="button" class="btn btn btn-success btn-secondary">Restore</button>`))
  t.true(html.includes(`<button type="button" class="btn btn btn-danger btn-secondary">Delete</button>`))
  
  
  t.true(html.includes('<h5 class="w-full text-center pt-1 pb-1">Trashed Pages (temp content)</h5>'))
  t.true(html.includes(`<h4 class="card-title">testMongoAtlas</h4>`))

  t.true(html.includes(`<button type="button" class="btn btn btn-success btn-secondary">Restore</button>`))
  t.true(html.includes(`<button type="button" class="btn btn btn-danger btn-secondary">Delete</button>`))
  
})



test('Route /users exits and render HTML', async t => {
  let context = {}
  const { html } = await nuxt.renderRoute('/users', context)
  
  t.true(html.includes('<h4 class="w-full text-center pt-1 pb-1">User Management</h4>'))
  
})



test('Route /seo exits and render HTML', async t => {
  let context = {}
  const { html } = await nuxt.renderRoute('/seo', context)
  
  t.true(html.includes('<h4 class="w-full text-center pt-1 pb-1">SEO Settings</h4>'))
  
})


test.after('Closing server', t => {
  nuxt.close()
})
  

