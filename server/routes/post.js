const { Router } = require("express");
const PostModel = require("../models/post");
const authMiddleware = require("../middlewares/authMiddleware");

const addTrashedPost = require("../utils/addTrashedPost");

const router = Router();

router.get("/published", async (req, res) => {
  try {
    let { limit, skip } = req.query;
    let Post = new PostModel();
    let result = await Post.getPublishedPosts({ limit, skip });
    // console.log("result", result);
    console.log("checking the session",req.session);
    res.send(result);
  } catch (e) {
    res.send(e);
  }
});

router.get("/myPosts", authMiddleware,async (req, res) => {
  try {
    let { limit, skip } = req.query;
    let Post = new PostModel();
    // let result = await Post.getMyPosts({ limit, skip }, req.session.authUser.id);

    let result = await Post.getMyPosts({ limit, skip }, req.session.authUser.id);
    console.log("result", result);
    res.send(result);
  } catch (e) {
    res.send(e);
  }
});
router.get("/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let Post = new PostModel();
    let result = await Post.getById(id);
    res.send(result);
  } catch (e) {
    res.send(e);
  }
});

router.put("/:id", authMiddleware,async (req, res) => {

  try {
    let { id } = req.params;

    let { body } = req;
    let Post = new PostModel();
    let post1 = await Post.getById(id);

    if(post1.createdBy != req.session.authUser.id){             //check for authenticity before updation
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

    if(post1.createdBy != req.session.authUser.id){             //check for authenticity before deletion
      throw new Error('unauthorised deletion');
    }

    addTrashedPost(post1);

    let result = await post1.delete(post1._id);       //added await here

    // console.log('result from router/pages')
    // console.log(result);

    // addTrashedPost(result);
    res.send(result)
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

    body.author = req.session.authUser.fullname;       //saving the author name
    body.createdBy = req.session.authUser.id;         //association with user model

    let Post = new PostModel();
    await Post.create(body);
    return res.send("sucessfully created");
  } catch (e) {
    console.log("error ", e);
    res.send(e);
  }
});

module.exports = router;
