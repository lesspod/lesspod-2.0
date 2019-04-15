const { Router } = require("express");
const MenuModel = require("../models/menu");
const authMiddleware = require("../middlewares/authMiddleware");
const addTrashedMenu = require("../utils/addTrashedMenu");

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

router.delete("/:menuName", authMiddleware,async (req, res) => {
  try {
    let { menuName } = req.params;
    let Menu = new MenuModel();
    let menu1 = await Menu.getByMenuName(menuName);
    

      if(menu1.createdBy != req.session.authUser.id){           //check for authenticity
        throw new Error('unauthorised deletion!!!!!!');       
      }
  
      let result = menu1.delete(menu1._id);
      addTrashedMenu(menu1)
      res.send(result)
    
    // if(menu1.createdBy != req.session.authUser.id){           //check for authenticity
    //   throw new Error('unauthorised deletion!!!!!!');       
    // }

    // let result = menu1.delete(menu1._id);
    // addTrashedMenu(menu1)
    // res.send(result)
  } catch (e) {
    console.log(e);
    res.send(e);
  }
});

router.put("/:id", authMiddleware,async (req, res) => {
  try {
    let { id } = req.params;
    let { body } = req;
    let Menu = new MenuModel();
    
    let menu1 = await Menu.getById(id);

    if(menu1.createdBy != req.session.authUser.id){         //check for authenticity
      throw new Error('unauthorised updation!!!!!!!!');
    }

    await Menu.update(id, body);
    res.send("updated successfully")
  } catch (e) {
    console.log(e);
    res.send(e);
  }
});

router.post("/", authMiddleware,async (req, res) => {        //authMiddleware
  try {
    let { body } = req;

    body.createdBy = req.session.authUser.id;     //associating with user model
    
    let Menu = new MenuModel();
    await Menu.create(body);
    return res.send("sucessfully created");
  } catch (e) {
    console.log("error ", e);
    res.send(e);
  }
});

module.exports = router;
