const express = require('express')

const router = express.Router()

// routes
router.get('/', async (req, res) => {
  res.send({
    message: 'hello world'
  })
})

// main router
module.exports = router
