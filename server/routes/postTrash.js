const { Router } = require("express");
const TrashedPostModel = require("../models/trashedPost");
const authMiddleware = require("../middlewares/authMiddleware");

const router = Router();

router.get("/", async (req, res) => {
  try {
    let { limit, skip } = req.query;
    let Trash= new TrashedPostModel();
    let result = await Trash.get({ limit, skip });
    console.log("result", result);
    res.send(result);
  } catch (e) {
        console.log(e);
        res.send(e);
  }
});


router.delete("/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let Trash = new TrashedPostModel();

    let trash1 = Trash.getTrashPostbyid(id);

    // if(post1.createdBy != req.session.authUser.id){             //check for authenticity before deletion
    //   throw new Error('unauthorised deletion');
    // }

    let result =await Trash.delete(id);
    res.send(result)
  } catch (e) {
    console.log(e);
    res.send(e);
  }
});


module.exports = router;
