const { Router } = require('express')
const PostModel = require('../models/post')
// routes
const auth = require('./auth')
const post = require('./post')

const router = Router()
// register routes
router.use('/auth', auth)
router.use('/post', post)

module.exports = router
