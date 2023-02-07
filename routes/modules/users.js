const express = require("express")
const router = express.Router()
const User = require('../../models/User')

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
  const { name, email, password, confirmPassword } = req.body
  User.findOne({ email })
    .then(user => {
      if (user) {
        console.log('warning')
        req.flash('warning_msg', 'User already exists.')
        return res.render('register', {
          name, email, password, confirmPassword
        })
      }
      return User.create({ name, email, password })
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
    })
})
router.get('/logout', (req, res) => {
  req.logout()
  return res.redirect('/users/login')
})

module.exports = router