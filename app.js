const express = require("express")
const exphbs = require("express-handlebars")
const methodOverride = require("method-override")
const flash = require("connect-flash")
const session = require("express-session")
const usePassport = require("./config/passport")
const routes = require("./routes")
const handlebarsHelpers = require("./helpers/handlebars-helpers")
require("./config/mongoose")

const app = express()
app.engine("hbs", exphbs({ defaultLayout: "main", extname: "hbs", helpers: handlebarsHelpers }))
app.set("view engine", "hbs")

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config()
}

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride("_method"))

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))
usePassport(app)

app.use(flash())
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash("success_msg")
  res.locals.error_msg = req.flash("error_msg")
  next()
})

app.use(routes)

const port = 3000
app.listen(port, () => {
  console.log(`Express is working on http://localhost:${3000}`)
})