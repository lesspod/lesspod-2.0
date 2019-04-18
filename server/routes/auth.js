const joi = require("joi");
const { Router } = require("express");
const { hashPassword, comparePassword } = require("../utils/password");
const { generateToken } = require("../utils/token");
const { loginSchema, signupSchema } = require("../validators/user");
const UserModel = require("../models/user");
const session = require('express-session');
const router = Router();

router.post("/signup", async (req, res) => {
  try {
    let { body } = req;
    const { error, value } = joi.validate(body, signupSchema);
    if (error) {
      return res.status(400).send(error.message);
    }
    value.password = hashPassword(value.password);
    const User = new UserModel();
    await User.create(value);
    res.send("sucessfully created user");
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

router.post("/login", async (req, res) => {
  try {
    let { body } = req;
    const { error, value } = joi.validate(body, loginSchema);

    if (error) {
      return res.status(400).send({ error: error.message });
    }
    console.log(value)
    const User = new UserModel();
    const user = await User.getByEmail(value.username);

    if (!user) {
      return res.status(400).send({ error: "invalid email or password" });
    }

    let isCorrectPassword = comparePassword(value.password, user.password);
    if (!isCorrectPassword) {
      // return res.status(400).send("invalid email or password");
      return res.status(401).json({ error: 'Bad credentials' })
    }

    let token = generateToken({ userId: user._id });


    // res.json({
    //   token,
    //   username: user.username
    // });

    if (isCorrectPassword) {
      // if(!req.session) {
      //   console.log('session in auth: ' + req.session);
      // // }
      // req.session.authUser = {
      //   username: user.username,
      //   fullname : user.fullname,
      //   id : user._id,
      //   token : token
      // };  //grabbing info about user
 
      return res.json({
        token,
        username: user.username,
        userId : user._id,
        fullname : user.fullname
      });
    }
    res.end();

  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});
module.exports = router;
