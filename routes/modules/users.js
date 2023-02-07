const express = require("express")
const router = express.Router()
// const Users = require('../../models/User')

router.get('/login', (req, res) => {
  return res.render('login')
})
router.post('/login', (req, res) => {
  res.send('login')
})
router.get('/register', (req, res) => {
  return res.render('register')
})
router.post('/register', (req, res) => {
  res.send('register')
})

module.exports = router