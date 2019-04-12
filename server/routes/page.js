const { Router } = require("express");
const PageModel = require("../models/page");
const authMiddleware = require("../middlewares/authMiddleware");
const addTrashedPage = require("../utils/addTrashedPage");

const router = Router();

router.get("/", async (req, res) => {
  try {
    let { limit, skip } = req.query;
    let Page = new PageModel();
    let result = await Page.get({ limit, skip });
    console.log("result", result);
    res.send(result);
  } catch (e) {
    res.send(e);
  }
});

router.get("/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let Page = new PageModel();
    let result = await Page.getById(id);
    res.send(result);
  } catch (e) {
    res.send(e);
  }
});

router.put("/:id", authMiddleware,async (req, res) => {

  try {
    let { id } = req.params;
    let { body } = req;
    let Page = new PageModel();

    let page1 = await Page.getById(id);

    if(page1.createdBy != req.session.authUser.id){         //authorising the creator
      throw new Error('unauthorised updation!!!!');
    }

    console.log('updating a page (routes)... ' + id + ', body= ' + body);
    let result = await Page.update(id, body);
    res.send(result);
  } catch (e) {
    console.log(e);
    res.send(e);
  }
});

router.delete("/:id", authMiddleware,async (req, res) => {
  try {
    let { id } = req.params;
    let Page = new PageModel();
    let page1 = await Page.getById(id);

    if(page1.createdBy != req.session.authUser.id){           //authorising the creator
      throw new Error('unauthorised deletion!!!!');
    }

    let result =await page1.delete(page1._id);
    addTrashedPage(result);
    res.send(result);
  } catch (e) {
    console.log(e);
    res.send(e);
  }
});

router.post("/", authMiddleware,async (req, res) => {
  try {
    let { body } = req;

    body.createdBy = req.session.authUser.id;           
    body.author = req.session.authUser.fullname;

    let Page = new PageModel();
    let page1 = await Page.create(body);
    return res.send(page1);
  } catch (e) {
    console.log("error ", e);
    res.send(e);
  }
});

module.exports = router;
