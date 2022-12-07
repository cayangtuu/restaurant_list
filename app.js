const express = require("express")
const exphbs = require("express-handlebars")
const restaurantList = require("./restaurant.json").results

const app = express()
app.engine("hbs", exphbs({ defaultLayout: "main", extname: "hbs" }))
app.set("view engine", "hbs")

app.use(express.static('public'))

app.get("/", (req, res) => {
  res.render("index", { restaurants: restaurantList })
})

app.get("/restaurants/:id", (req, res) => {
  const id = req.params.id
  const restaurantOne = restaurantList.find(restaurant => restaurant.id.toString() === id)
  res.render("show", { restaurant: restaurantOne })
})

app.get("/search", (req, res) => {
  const keyword = req.query.keyword
  const restaurantSearch = restaurantList.filter(restaurant => restaurant.name.toLowerCase().includes(keyword.toLowerCase()))
  res.render("index", { restaurants: restaurantSearch })
})

const port = 3000
app.listen(port, () => {
  console.log(`Express is working on http://localhost:${3000}`)
})