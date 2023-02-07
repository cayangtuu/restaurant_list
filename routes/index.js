const express = require("express")
const router = express.Router()
const home = require("./modules/home")
const restaurants = require("./modules/restaurants")
const users = require('./modules/users')
const { generalErrorHandler } = require("../middleware/error")

router.use("/", home)
router.use("/restaurants", restaurants)
router.use("/users", users)

router.use('/', generalErrorHandler)

module.exports = router