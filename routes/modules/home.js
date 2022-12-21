const express = require("express")
const router = express.Router()
const Restaurants = require("../../models/Restaurant")

router.get("/", (req, res) => {
  Restaurants.find()
    .lean()
    .then(restaurant => {
      res.render("index", { restaurant })
    })
    .catch(error => {
      console.log(error)
      res.render("error", { "errmsg": error.message })
    })
})

router.get("/search", (req, res) => {
  const keyword = req.query.keyword
  const sort = req.query.sort
  Restaurants.find()
    .lean()
    .sort(sort)
    .then(restaurant => {
      const restaurantSearch = restaurant
        .filter(restaurant => {
          return restaurant.name.toLowerCase().includes(keyword.toLowerCase())
        });
      res.render("index", { restaurant: restaurantSearch, keyword, sort })
    })
    .catch(error => {
      console.log(error)
      res.render("error", { "errmsg": error.message })
    })
})

module.exports = router