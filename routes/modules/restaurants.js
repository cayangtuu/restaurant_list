const express = require("express")
const { Promise } = require("mongoose")
const router = express.Router()
const Restaurant = require("../../models/Restaurant")

let categoryList = (restaurant) => {
  return restaurant
    .map(restaurant => restaurant.category)
    .filter((item, index, arr) => {
      return arr.indexOf(item) === index
    })
}

router.get("/new", (req, res, next) => {
  const userId = req.user._id
  return Restaurant.find({ userId })
    .lean()
    .then(restaurant => categoryList(restaurant))
    .then(categories => res.render("new", { categories }))
    .catch(err => next(err))
})

router.post("/", (req, res, next) => {
  const userId = req.user._id
  req.body.userId = userId
  return Restaurant.create(req.body)
    .then(() => res.redirect("/"))
    .catch(err => next(err))
})

router.get("/:id", (req, res, next) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurant => res.render("show", { restaurant }))
    .catch(err => next(err))
})

router.get("/:id/edit", (req, res, next) => {
  const userId = req.user._id
  const _id = req.params.id
  Promise.all([Restaurant.findOne({ _id, userId }).lean(), Restaurant.find({ userId })])
    .then(([restaurant, restaurants]) => {
      const categories = categoryList(restaurants)
      res.render("edit", { restaurant, categories })
    })
    .catch(err => next(err))
})

router.put("/:id", (req, res, next) => {
  const userId = req.user._id
  const _id = req.params.id
  Restaurant.findOne({ _id, userId })
    .then(restaurant => {
      for (const item in req.body) {
        restaurant[item] = req.body[item]
      }
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${_id}`))
    .catch(err => next(err))
})

router.delete("/:id", (req, res, next) => {
  const userId = req.user._id
  const _id = req.params.id
  Restaurant.findOne({ _id, userId })
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect("/"))
    .catch(err => next(err))
})

module.exports = router