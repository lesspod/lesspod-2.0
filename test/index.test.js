//make sure server is running

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
  nuxt = new Nuxt(config)
  await new Builder(nuxt).build()
  nuxt.listen(4000, 'localhost')
})


// Example of testing only generated html
test('Route / exits and render HTML', async t => {
  let context = {}
  const { html } = await nuxt.renderRoute('/', context)
  t.true(html.includes('<button type="submit" class="btn btn-primary">Login</button>'))

})

test('Route /login exits and render HTML', async t => {
  let context = {}
  const { html } = await nuxt.renderRoute('/login', context)
  t.true(html.includes("<h3>Let's Login</h3>"))
  
})

test('Route /signup exits and render HTML', async t => {
  let context = {}
  const { html } = await nuxt.renderRoute('/signup', context)
  // console.log(html)
  t.true(html.includes('<h3>Create An Account</h3>'))
  t.true(html.includes('<span style="margin-top: 0.7rem;">If you already have an account, you can <a href="/login">Login here</a>.</span>'))
})

test('Route /pages exits and render HTML', async t => {
  let context = {}
  const { html } = await nuxt.renderRoute('pages', context)
  t.true(html.includes('<h4 class="w-full text-center pt-1 pb-1">Admin Pages</h4>'))
  
})

test('Route /post/all exits and render HTML', async t => {
  let context = {}
  const { html } = await nuxt.renderRoute('/post/all', context)
  t.true(html.includes('<h4 class="w-full text-center pt-1 pb-1">Admin Posts</h4>'))
  
})

  
  
// test('Route /blog exits and render HTML', async t => {
//   let context = {}
//   const { html } = await nuxt.renderRoute('blog', context)
//   t.true(html.includes('<h4 class="w-full text-center pt-1 pb-1">All Blog Posts</h4>'))
  
// })


// test('Route /seo exits and render HTML', async t => {
//   let context = {}
//   const { html } = await nuxt.renderRoute('/seo', context)
//   t.true(html.includes('<h4 class="w-full text-center pt-1 pb-1">SEO Settings</h4>'))
  
// })




// test('Route /users exits and render HTML', async t => {
//   let context = {}
//   const { html } = await nuxt.renderRoute('/users', context)
//   t.true(html.includes('<h4 class="w-full text-center pt-1 pb-1">User Management</h4>'))
  
// })




// test('Route /trash exits and render HTML', async t => {
//   let context = {}
//   const { html } = await nuxt.renderRoute('/trash', context)
//   // console.log(html)
//   t.true(html.includes('<button type="button" >Restore</button>'))
//   t.true(html.includes('<h5 class="w-full text-center pt-1 pb-1">Trashed Posts (temp content)</h5>'))
  
// })


// test('Route /admin exits and render HTML', async t => {
//   let context = {}
//   const { html } = await nuxt.renderRoute('/admin', context)
//   // t.true(html.includes("<h3>Let's Login</h3>"))
//   // console.log(html)
//   t.true(html.includes('<h4 class="w-full text-center pt-1 pb-1">Dashboard</h4>'))
  
// })





// // Example of testing via DOM checking
// test('Route / exits and render HTML with CSS applied', async t => {

//   console.log('!!!!!!!!!!!!!hayaayaya')  


//     const {window} = await nuxt.renderAndGetWindow('http://localhost:4000/')
  
//     console.log('!!!!!!!!!!!!!!!window!!!!!')
//     console.log(window)
//     // const element = window.document.querySelector('[href=/signup]')
//     // t.not(element, null)
//     // t.is(element.textContent, 'Create An Account!')
  
  
    
    

//   // t.is(element.className, 'red')
//   // t.is(window.getComputedStyle(element).color, 'red')
// })

// Close the Nuxt server
test.after('Closing server', t => {
  nuxt.close()
})
