const express = require("express")
const router = express.Router()
const Restaurant = require("../../models/Restaurant")

let categoryList = function () {
  return Restaurant.find()
    .lean()
    .then(restaurant => {
      return restaurant
        .map(restaurant => restaurant.category)
        .filter((item, index, arr) => {
          return arr.indexOf(item) === index
        })
    })
    .catch(err => next(err))
}

router.get("/new", (req, res, next) => {
  categoryList()
    .then(categories => {
      res.render("new", { categories })
    })
    .catch(err => next(err))
})

router.post("/", (req, res, next) => {
  Restaurant.create(req.body)
    .then(() => res.redirect("/"))
    .catch(err => next(err))
})

router.get("/:id", (req, res, next) => {
  const id = req.params.id
  Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render("show", { restaurant }))
    .catch(err => next(err))
})

router.get("/:id/edit", (req, res, next) => {
  const id = req.params.id
  Restaurant.findById(id)
    .lean()
    .then(restaurant => {
      categoryList().then(categories => {
        res.render("edit", { restaurant, categories })
      })
    })
    .catch(err => next(err))
})

router.put("/:id", (req, res, next) => {
  const id = req.params.id
  Restaurant.findById(id)
    .then(restaurant => {
      for (const item in req.body) {
        restaurant[item] = req.body[item]
      }
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(err => next(err))
})

router.delete("/:id", (req, res, next) => {
  const id = req.params.id
  Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect("/"))
    .catch(err => next(err))
})

module.exports = router