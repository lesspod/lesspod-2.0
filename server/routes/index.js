const { Router } = require("express");
const PostModel = require("../models/post");
// routes
const auth = require("./auth");
const post = require("./post");
const page = require("./page");
const menu = require("./menu");

const router = Router();
// register routes
router.use("/auth", auth);
router.use("/post", post);
router.use("/page", page);
router.use("/menu", menu);

module.exports = router;
