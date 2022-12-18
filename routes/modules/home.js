const express = require("express")
const router = express.Router()
const Restaurants = require("../../models/Restaurant")

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

router.get("/", (req, res) => {
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

router.get("/search", (req, res) => {
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

module.exports = router