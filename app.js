const express = require("express")
const exphbs = require("express-handlebars")
const restaurantList = require("./restaurant.json").results


// 取得不重複之餐廳類別陣列
// function categoryList() {
//   const categories = []
//   restaurantList.forEach(restaurant => {
//     if (!categories.includes(restaurant.category)) {
//       categories.push(restaurant.category)
//     }
//   })
//   return categories
// }

// 取得不重複之餐廳類別陣列(另一寫法)
const categoryList = restaurantList.map(restaurant => restaurant.category)
  .filter((item, index, arr) => {
    return arr.indexOf(item) === index;
  })

const app = express()
app.engine("hbs", exphbs({ defaultLayout: "main", extname: "hbs" }))
app.set("view engine", "hbs")

app.use(express.static('public'))

app.get("/", (req, res) => {
  res.render("index", { restaurants: restaurantList, categories: categoryList })
})

app.get("/restaurants/:id", (req, res) => {
  const id = req.params.id
  const restaurantOne = restaurantList.find(restaurant => restaurant.id.toString() === id)
  res.render("show", { restaurant: restaurantOne })
})

app.get("/search", (req, res) => {
  const keyword = req.query.keyword
  const category = req.query.category
  const restaurantSearch = restaurantList.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword.toLowerCase()) && restaurant.category.includes(category)
  })
  res.render("index", { restaurants: restaurantSearch, categories: categoryList, keyword: keyword, category: category })
})

const port = 3000
app.listen(port, () => {
  console.log(`Express is working on http://localhost:${3000}`)
})