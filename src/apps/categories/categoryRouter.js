const express = require("express")
const CategoryController = require("./categoryController")

const categoriesRouters = express.Router()

categoriesRouters.get("/admin/categories", CategoryController.findAll)
categoriesRouters.get("/admin/categories/new", CategoryController.form)
categoriesRouters.get("/admin/categories/delete/:id", CategoryController.delete)
categoriesRouters.get("/admin/categories/update/:id", CategoryController.updateForm)
categoriesRouters.post("/admin/categories/update/:id", CategoryController.update)
categoriesRouters.post("/admin/categories/save", CategoryController.create)

module.exports = categoriesRouters