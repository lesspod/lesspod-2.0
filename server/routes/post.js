const { Router } = require("express");
const PostModel = require("../models/post");
const authMiddleware = require("../middlewares/authMiddleware");


const router = Router();

router.get("/", async (req, res) => {
  try {
    let { limit, skip } = req.query;
    let Post = new PostModel();
    let result = await Post.get({ limit, skip });
    console.log("result", result);
    res.send(result);
  } catch (e) {
    res.send(e);
  }
});

// router.get("/:id", async (req, res) => {
//   try {
//     let { id } = req.params;
//     let Post = new PostModel();
//     let result = await Post.getById(id);
//     res.send(result);
//   } catch (e) {
//     res.send(e);
//   }
// });

router.put("/:id", authMiddleware, async (req, res) => {

  try {
    let { id } = req.params;

    let { body } = req;

    let Post = new PostModel();

    let post1 = await Post.getById(id);
    
    if(post1.createdBy != req.session.authUser.id){
      throw new Error('unauthorised updation');
    }
    
    console.log('updating a page (routes)... ' + id + ', body= ' + body);
    
    let result = await Post.update(id, body);
    res.send(result);
  } catch (e) {
    console.log(e);
    res.send(e);
  }
});

router.delete("/:id", authMiddleware,async (req, res) => {
  try {
    let { id } = req.params;

    let Post = new PostModel();
    let post1 = await Post.getById(id);

    if(post1.createdBy != req.session.authUser.id){
      throw new Error('unauthorised deletion');
    }
    
    let result = post1.delete(post1._id);
    res.send(result);
  } catch (e) {
    console.log(e);
    res.send(e);
  }
});

router.put("/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let { body } = req;
    let Post = new PostModel();
    await Post.update(id, body);
    res.send("updated successfully")
  } catch (e) {
    res.send(e);
  }
});

router.post("/", authMiddleware,async (req, res) => {
  try {
    let { body } = req;
    
    body.author = req.session.authUser.fullName; //added author name as per session

    body.createdBy = req.session.authUser.id;    //associating with user model

    
    let Post = new PostModel();
    await Post.create(body);
    return res.send("sucessfully created");
  } catch (e) {
    console.log("error ", e);
    res.send(e);
  }
});

module.exports = router;
