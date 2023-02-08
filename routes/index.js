const express = require("express")
const router = express.Router()
const home = require("./modules/home")
const restaurants = require("./modules/restaurants")
const users = require('./modules/users')
const { generalErrorHandler } = require("../middleware/error")
const { authenticator } = require("../middleware/auth")

router.use("/restaurants", authenticator, restaurants)
router.use("/users", users)
router.use("/", authenticator, home)

router.use('/', generalErrorHandler)

module.exports = router