const { Router } = require("express");
const PostModel = require("../models/post");
// routes
const auth = require("./auth");
const post = require("./post");
const page = require("./page");
const menu = require("./menu");
const postTrash = require("./postTrash"); 
const pageTrash = require("./pageTrash");

const router = Router();
// register routes
router.use("/auth", auth);
router.use("/post", post);
router.use("/page", page);
router.use("/menu", menu);
router.use("/trash", postTrash);
router.use("/trashPage", pageTrash);

module.exports = router;
