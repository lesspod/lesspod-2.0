const { Router } = require("express");
const MenuModel = require("../models/menu");
const authMiddleware = require("../middlewares/authMiddleware");

const router = Router();

router.get("/", async (req, res) => {
  try {
    let { limit, skip } = req.query;
    let Menu = new MenuModel();
    let result = await Menu.get({ limit, skip });
    console.log("result", result);
    res.send(result);
  } catch (e) {
    res.send(e);
  }
});

router.get("/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let Menu = new MenuModel();
    let result = await Menu.getById(id);
    res.send(result);
  } catch (e) {
    res.send(e);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let Menu = new MenuModel();
    let menu1 = await Menu.getById(id);
    let result = menu1.delete(menu1._id);
    res.send(result)
  } catch (e) {
    res.send(e);
  }
});

router.put("/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let { body } = req;
    let Menu = new MenuModel();
    await Menu.update(id, body);
    res.send("updated successfully")
  } catch (e) {
    res.send(e);
  }
});

router.menu("/", async (req, res) => {
  try {
    let { body } = req;
    let Menu = new MenuModel();
    await Menu.create(body);
    return res.send("sucessfully created");
  } catch (e) {
    console.log("error ", e);
    res.send(e);
  }
});

module.exports = router;
