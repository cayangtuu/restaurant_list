const express = require("express")
const exphbs = require("express-handlebars")
const mongoose = require("mongoose")
const restaurant = require("./models/Restaurant")
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
app.use(express.urlencoded({ extended: true }))

let categoryList = function () {
  return Restaurants.find()
    .lean()
    .then(restaurant => {
      return restaurant
        .map(restaurant => restaurant.category)
        .filter((item, index, arr) => {
          return arr.indexOf(item) === index;
        });
    })
}

app.get("/", (req, res) => {
  Restaurants.find()
    .lean()
    .then(restaurant => {
      categoryList().then(categories => {
        res.render("index", { restaurant, categories })
      })
    })
    .catch(error => {
      console.log(error)
      res.render("error", { "errmsg": error.message })
    })
})

app.get("/restaurants/new", (req, res) => {
  categoryList()
    .then(categories => {
      res.render("new", { categories })
    })
    .catch(error => {
      console.log(error)
      res.render("error", { "errmsg": error.message })
    })
})

app.post("/restaurants", (req, res) => {
  Restaurants.create(req.body)
    .then(() => res.redirect("/"))
    .catch(error => {
      console.log(error)
      res.render("error", { "errmsg": error.message })
    })
})

app.get("/restaurants/:id", (req, res) => {
  const id = req.params.id
  Restaurants.findById(id)
    .lean()
    .then(restaurant => res.render("show", { restaurant }))
    .catch(error => {
      console.log(error)
      res.render("error", { "errmsg": error.message })
    })
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
            restaurant.category.toLowerCase().includes(category.toLowerCase())
        });
      categoryList().then(categories => {
        res.render("index", { restaurant: restaurantSearch, categories, keyword, category })
      })
    })
    .catch(error => {
      console.log(error)
      res.render("error", { "errmsg": error.message })
    })
})

app.get("/restaurants/:id/edit", (req, res) => {
  const id = req.params.id
  Restaurants.findById(id)
    .lean()
    .then(restaurant => {
      categoryList().then(categories => {
        res.render("edit", { restaurant, categories })
      })
    })
    .catch(error => {
      console.log(error)
      res.render("error", { "errmsg": error.message })
    })
})

app.post("/restaurants/:id/edit", (req, res) => {
  const id = req.params.id
  Restaurants.findById(id)
    .then(restaurant => {
      for (const item in req.body) {
        restaurant[item] = req.body[item]
      }
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => {
      console.log(error)
      res.render("error", { "errmsg": error.message })
    })
})

app.post("/restaurants/:id/delete", (req, res) => {
  const id = req.params.id
  Restaurants.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect("/"))
    .catch(error => {
      console.log(error)
      res.render("error", { "errmsg": error.message })
    })
})

const port = 3000
app.listen(port, () => {
  console.log(`Express is working on http://localhost:${3000}`)
})