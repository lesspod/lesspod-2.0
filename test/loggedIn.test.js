
import test from 'ava'
const { Nuxt, Builder } = require("nuxt");
import { resolve } from 'path'
const Cookie = require('js-cookie') 

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


test('Route / exits and render HTML', async t => {
    // const user = {
    //     token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiO…I1N30.Vj_uo2BzEHjSLVxuOz3uO3ipdqaYBYo862Gy3FsdJAY", 
    //     username: "test@gmail.com", 
    //     userId: "5d136460c8ad101e52ca78b5", 
    //     fullname: "Test3"
    // }
    
  
    // let req = {
    //     headers: {
    //         cokkie : user
    //     }
    // }; 
    let context = {};
    
    
    const { html } = await nuxt.renderRoute('/', context)
    t.true(html.includes('<button type="submit" class="btn btn-primary">Login</button>'))
  
  })

  test.after('Closing server', t => {
    nuxt.close()
  })
  

