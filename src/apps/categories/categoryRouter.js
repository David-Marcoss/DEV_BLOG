const express = require("express")
const CategoryController = require("./categoryController")
const {isAdmin} = require("../middlewares/authUser")

const categoriesRouters = express.Router()

//rotas admin
categoriesRouters.get("/admin/categories",isAdmin,CategoryController.findAll)
categoriesRouters.get("/admin/categories/page/:page", isAdmin,CategoryController.findAll)
categoriesRouters.get("/admin/categories/new", isAdmin,CategoryController.new)
categoriesRouters.get("/admin/categories/edit/:id",isAdmin, CategoryController.edit)
categoriesRouters.post("/admin/categories/update/:id",isAdmin, CategoryController.update)
categoriesRouters.post("/admin/categories/delete/",isAdmin, CategoryController.delete)
categoriesRouters.post("/admin/categories/save",isAdmin, CategoryController.create)

module.exports = categoriesRouters