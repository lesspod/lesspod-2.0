process.env.NODE_ENV = 'test';

const test = require('ava');
const request = require('supertest');
const app = require('../server/app');
const PostModel = require("../server/models/post");

const mongoose = require('mongoose');

const ObjectId = mongoose.Types.ObjectId;
mongoose.connect('mongodb://localhost:27017/lessPodTest');

// let testPost = {
//     isPublished : true,
//     title : 'Testing Post',
//     content : 'test Case 1'
// }

// let Post = new PostModel();

// // test.beforeEach(async t => {
// //     Post.deleteAll().then(async () => {
// //         let p = await Post.create(testPost);
// //     })
// // })

// var id;

test('/POST signing up a user', async t => {
    const res = await request(app)
        .post('/api/auth/signup')
        .send({username : 'abc@gmail.com', password : 'qwerty12345', fullname: 'pawan soni', email : 'pwn@gmail.com'});
        t.is(res.status, 200);
        t.is(res.text, 'sucessfully created user')
        console.log('testing login')
        console.log(res.text);
});

// var authCookie;

// test('/POST logging in a user r', async t => {
//     const res = await request(app)
//         .post('/api/auth/login')
//         .send({username : 'pwn@gmail.com', password : 'qwerty12345'});
//         t.is(res.status, 200);
//         // t.is(res.text, 'sucessfully created user')
//         console.log('testing login')
//         authCookie = res.body;
//         console.log(res.body);

// });


// // test('/GET testing for blogs(published posts)', async function(t) {
// //     try {
// //     const response = await request(app)
// //       .get('/api/post/published');


// //       console.log(response.body)
// //       id = '' + response.body[0]._id;
// //       console.log(id);
      
// //       t.is(response.status, 200);
// //       t.is(typeof(response.body), 'object');
// //       t.is(response.body.length, 1);
// //     } catch(e){
// //         console.log(e);
// //     }
// // })



  

// // test('/GET a particular post', async t => {
// //     try{
// //     const res = await request(app)
// //     .get('/api/post/' + id);

// //     console.log(id);


// //     console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!particular pst')
// //     console.log(res.body)
    
// //     t.is(res.status, 200);
// //     t.is(typeof(res.body), 'object');
// //     }catch(e){
// //         console.log(e);
// //     }
// // })

// // authCookie = { token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1Y2JkZWE5YzM2YjRiN2M5MDNhODgyNDgiLCJpYXQiOjE1NTU5NTA3NzUsImV4cCI6MTU4NzA1NDc3NX0.bZLLWrADMtbzaWEFzN9rtyFj5WmVDHLKqoFfuSjJlQY',
// //    username: 'pwn@gmail.com',
// //    userId: '5cbdea9c36b4b7c903a88248',
// //    fullname: 'pawan soni' }


// // test('/DELETE a particular post', async t => {
// //     try{
// //     const res = await request(app)
// //     .delete('/api/post/' + id)
// //     .set('Cookie', [auth = JSON.stringify(authCookie)]);

// //     console.log(id);


// //     console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
// //     console.log(res)
    
// //     // t.is(res.status, 200);
// //     t.is(typeof(res.body), 'object');
// //     }catch(e){
// //         console.log(e);
// //     }
// // })



