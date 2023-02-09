const express = require("express")
const router = express.Router()
const Restaurants = require("../../models/Restaurant")

router.get("/", (req, res, next) => {
  const userId = req.user._id
  return Restaurants.find({ userId })
    .lean()
    .then(restaurant => {
      res.render("index", { restaurant })
    })
    .catch(err => next(err))
})

router.get("/search", (req, res, next) => {
  const { keyword, sort } = req.query
  const userId = req.user._id
  return Restaurants.find({ userId })
    .lean()
    .sort((sort === 'asc' || sort === 'desc') ? { name: sort } : sort)
    .then(restaurant => {
      const restaurantSearch = restaurant
        .filter(restaurant => {
          return restaurant.name.toLowerCase().includes(keyword.toLowerCase()) ||
            restaurant.category.toLowerCase().includes(keyword.toLowerCase())
        });
      res.render("index", { restaurant: restaurantSearch, keyword, sort })
    })
    .catch(err => next(err))
})

module.exports = router