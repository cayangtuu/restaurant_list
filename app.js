const express = require("express")
const exphbs = require("express-handlebars")
const methodOverride = require("method-override")
const routes = require("./routes")
require("./config/mongoose")

const app = express()
app.engine("hbs", exphbs({
  defaultLayout: "main", extname: "hbs", helpers: {
    'ifEq': function (a, b, opts) {
      return (a === b) ? opts.fn(this) : opts.inverse(this)
    }
  }
}))
app.set("view engine", "hbs")

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride("_method"))
app.use(routes)

const port = 3000
app.listen(port, () => {
  console.log(`Express is working on http://localhost:${3000}`)
})