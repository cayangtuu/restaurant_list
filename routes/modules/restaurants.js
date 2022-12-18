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

router.get("/new", (req, res) => {
  categoryList()
    .then(categories => {
      res.render("new", { categories })
    })
    .catch(error => {
      console.log(error)
      res.render("error", { 'errmsg': error.message })
    })
})

router.post("/", (req, res) => {
  Restaurants.create(req.body)
    .then(() => res.redirect("/"))
    .catch(error => {
      console.log(error)
      res.render("error", { 'errmsg': error.message })
    })
})

router.get("/:id", (req, res) => {
  const id = req.params.id
  Restaurants.findById(id)
    .lean()
    .then(restaurant => res.render("show", { restaurant }))
    .catch(error => {
      console.log(error)
      res.render("error", { 'errmsg': error.message })
    })
})

router.get("/:id/edit", (req, res) => {
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
      res.render("error", { 'errmsg': error.message })
    })
})

router.put("/:id", (req, res) => {
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
      res.render("error", { 'errmsg': error.message })
    })
})

router.delete("/:id", (req, res) => {
  const id = req.params.id
  Restaurants.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect("/"))
    .catch(error => {
      console.log(error)
      res.render("error", { 'errmsg': error.message })
    })
})

module.exports = router