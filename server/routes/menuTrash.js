const { Router } = require("express");
const TrashedMenuModel = require("../models/trashedMenu");
const authMiddleware = require("../middlewares/authMiddleware");

const router = Router();

router.get("/", async (req, res) => {
  try {
    let { limit, skip } = req.query;
    let Trash= new TrashedMenuModel();
    let result = await Trash.get({ limit, skip });
    console.log("result", result);
    res.send(result);
  } catch (e) {
        console.log(e);
        res.send(e);
  }
});


router.delete("/:menuName", async (req, res) => {
  try {
    let { menuName } = req.params;
    let Trash = new TrashedMenuModel();

    let trash1 =await Trash.getTrashedMenuMenuName(menuName);

    console.log('trash Pge!!!!!');
    console.log(trash1);

    // if(post1.createdBy != req.session.authUser.id){             //check for authenticity before deletion
    //   throw new Error('unauthorised deletion');
    // }

    let result = await Trash.delete(trash1._id);
    res.send(result)
  } catch (e) {
    // console.log(e);
    res.send(e);
  }
});

// router.put("/:id", async (req, res) => {
//   try {
//     let { id } = req.params;
//     let { body } = req;
//     let Post = new PostModel();
//     await Post.update(id, body);
//     res.send("updated successfully")
//   } catch (e) {
//     res.send(e);
//   }
// });

router.post("/", async (req, res) => {
  try {
    let { body } = req;
    
    // body.author = req.session.authUser.fullname;       //saving the author name
    // body.createdBy = req.session.authUser.id;         //association with user model
    
    let Trash = new TrashedPageModel();
    await Trash.create(body);
    return res.send("sucessfully created");
  } catch (e) {
    console.log("error ", e);
    res.send(e);
  }
});

module.exports = router;
