const joi = require('joi')
const { Router } = require('express')
const { hashPassword, comparePassword } = require('../utils/password')
const { generateToken } = require('../utils/token')
const { signupSchema } = require('../validators/user')
const UserModel = require('../models/user')

const router = Router()

router.post('/signup', async (req, res) => {
  try {
    let { body } = req
    const { error, value } = joi.validate(body, signupSchema)
    if (error) {
      return res.status(400).send(error.message)
    }
    value.password = hashPassword(value.password)
    const User = new UserModel()
    await User.create(value)
    res.send('sucessfully created user')
  } catch (e) {
    console.log(e)
    res.status(400).send(e)
  }
})

router.post('/login', async (req, res) => {
  try {
    let { body } = req
    const { error, value } = joi.validate(body, signupSchema)
    if (error) {
      return res.status(400).send(error.message)
    }

    const User = new UserModel()
    const user = await User.getByEmail(value.email)

    if (!user) {
      return res.status(400).send('invalid email or password')
    }

    let isCorrectPassword = comparePassword(value.password, user.password)
    if (!isCorrectPassword) {
      return res.status(400).send('invalid email or password')
    }

    let token = generateToken({ userId: user._id })

    res.json({
      token,
      username: user.username
    })
  } catch (e) {
    console.log(e)
    res.status(400).send(e)
  }
})
module.exports = router
