const express = require("express")
const ArticleController = require("./articleController")
const {isAdmin} = require("../middlewares/authUser")

const articlesRoute = express.Router()

//rotas publicas
articlesRoute.get("/articles/:slug", ArticleController.readArticle)
articlesRoute.get("/articles/category/:slug", ArticleController.categoryArticles)

// rotas admin
articlesRoute.get("/admin/articles",isAdmin, ArticleController.findAll)
articlesRoute.get("/admin/articles/page/:page",isAdmin, ArticleController.findAll)
articlesRoute.get("/admin/articles/new",isAdmin, ArticleController.new)
articlesRoute.get("/admin/articles/edit/:id",isAdmin, ArticleController.edit)
articlesRoute.post("/admin/articles/update/:id",isAdmin, ArticleController.update)
articlesRoute.post("/admin/articles/delete",isAdmin, ArticleController.delete)
articlesRoute.post("/admin/articles/save",isAdmin, ArticleController.create)

module.exports = articlesRoute