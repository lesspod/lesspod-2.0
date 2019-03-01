const { Router } = require("express");
const PageModel = require("../models/page");
const authMiddleware = require("../middlewares/authMiddleware");

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

router.put("/:id", async (req, res) => {

  try {
    let { id } = req.params;
    let { body } = req;
    console.log('updating a page (routes)... ' + id + ', body= ' + body);
    let Page = new PageModel();
    let result = await Page.update(id, body);
    res.send(result);
  } catch (e) {
    res.send(e);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let Page = new PageModel();
    let page1 = await Page.getById(id);
    let result = page1.delete(page1._id);
    res.send(result);
  } catch (e) {
    res.send(e);
  }
});

router.post("/", async (req, res) => {
  try {
    let { body } = req;
    let Page = new PageModel();
    await Page.create(body);
    return res.send("sucessfully created");
  } catch (e) {
    console.log("error ", e);
    res.send(e);
  }
});

module.exports = router;
