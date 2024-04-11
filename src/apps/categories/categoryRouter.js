const express = require("express")
const CategoryController = require("./categoryController")

const categoriesRouters = express.Router()

categoriesRouters.get("/admin/categories", CategoryController.findAll)
categoriesRouters.get("/admin/categories/page/:page", CategoryController.findAll)

categoriesRouters.get("/admin/categories/new", CategoryController.new)
categoriesRouters.get("/admin/categories/edit/:id", CategoryController.edit)
categoriesRouters.post("/admin/categories/update/:id", CategoryController.update)
categoriesRouters.post("/admin/categories/delete/", CategoryController.delete)
categoriesRouters.post("/admin/categories/save", CategoryController.create)

module.exports = categoriesRouters