const mongoose = require("mongoose")
const restaurantModel = require("../Restaurant")
const restaurantList = require("../../restaurant.json").results
const db = require("../../config/mongoose")

db.once('open', () => {
  restaurantList.forEach(restaurant => {
    restaurantModel.create(restaurant)
  });
  console.log("Restaurant data insert done!")
})