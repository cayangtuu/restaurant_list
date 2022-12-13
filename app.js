const express = require("express")
const exphbs = require("express-handlebars")
const mongoose = require("mongoose")
const Restaurants = require("./models/Restaurant")


if (process.env.NODE_ENV !== "production") {
  require("dotenv").config()
}
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})

const app = express()
app.engine("hbs", exphbs({ defaultLayout: "main", extname: "hbs" }))
app.set("view engine", "hbs")

app.use(express.static('public'))

app.get("/", (req, res) => {
  Restaurants.find()
    .lean()
    .then(restaurant => {
      const categories = restaurant
        .map(restaurant => restaurant.category)
        .filter((item, index, arr) => {
          return arr.indexOf(item) === index;
        });
      res.render("index", { restaurant, categories })
    })
    .catch(error => console.log(error))
})

app.get("/restaurants/:id", (req, res) => {
  const id = req.params.id
  Restaurants.findById(id)
    .lean()
    .then(restaurant => res.render("show", { restaurant }))
    .catch(error => console.log(error))
})

app.get("/search", (req, res) => {
  const keyword = req.query.keyword
  const category = req.query.category
  Restaurants.find()
    .lean()
    .then(restaurant => {
      const restaurantSearch = restaurant
        .filter(restaurant => {
          return restaurant.name.toLowerCase().includes(keyword.toLowerCase()) &&
            restaurant.category.includes(category)
        });
      console.log(restaurantSearch)
      const categories = restaurant
        .map(restaurant => restaurant.category)
        .filter((item, index, arr) => {
          return arr.indexOf(item) === index;
        });
      res.render("index", { restaurant: restaurantSearch, categories, keyword, category })
    })
})

const port = 3000
app.listen(port, () => {
  console.log(`Express is working on http://localhost:${3000}`)
})