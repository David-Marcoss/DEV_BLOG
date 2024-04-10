const express = require("express")
const ArticleController = require("./articleController")

const articlesRoute = express.Router()


articlesRoute.get("/admin/articles", ArticleController.findAll)
articlesRoute.get("/admin/articles/new", ArticleController.new)
articlesRoute.get("/admin/articles/edit/:id", ArticleController.edit)
articlesRoute.post("/admin/articles/delete", ArticleController.delete)
articlesRoute.post("/admin/articles/save", ArticleController.create)

module.exports = articlesRoute