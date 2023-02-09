const bcrypt = require("bcryptjs")
const Restaurant = require("../Restaurant")
const User = require("../User")
const restaurantList = require("./restaurant.json").results
const userList = require("./user.json").results
const db = require("../../config/mongoose")

db.once('open', () => {
  console.log("Start!")
  return Promise.all(
    userList.map((user, userIndex) => {
      return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(user.password, salt))
        .then(hash => User.create({
          name: user.name,
          email: user.email,
          password: hash
        }))
        .then(user => {
          return Promise.all(Array.from(restaurantList, (restaurant, resIndex) => {
            if (resIndex >= 3 * userIndex && resIndex < 3 * (userIndex + 1)) {
              restaurant.userId = user._id
              return Restaurant.create(restaurant)
            }
          }))
        })
        .catch(err => console.log(err))
    })
  )
    .then(() => {
      console.log("Done!")
      process.exit()
    })
    .catch(err => console.log(err))
})
