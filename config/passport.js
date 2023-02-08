const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const User = require("../models/User")

module.exports = app => {
  app.use(passport.initialize())
  app.use(passport.session())
  passport.use(new LocalStrategy(
    {
      usernameField: 'email',
      passReqToCallback: true
    },
    (req, email, password, done) => {
      User.findOne({ email })
        .then(user => {
          if (!user) {
            return done(null, false, req.flash('err_msg', 'The email is not registered!'))
          }
          if (user.email !== email) {
            return done(null, false, req.flash('err_msg', 'Email or Password incorrect!'))
          }
          return done(null, user)
        })
        .catch(err => done(err, false))
    }))
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err, null))
  })
}