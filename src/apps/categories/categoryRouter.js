const express = require("express")
const CategoryController = require("./categoryController")

const categoriesRouters = express.Router()

categoriesRouters.get("/admin/categories/new", CategoryController.form)
categoriesRouters.post("/admin/categories/save", CategoryController.create)

module.exports = categoriesRouters