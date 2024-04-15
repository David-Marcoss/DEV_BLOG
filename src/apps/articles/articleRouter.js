const express = require("express")
const ArticleController = require("./articleController")
const {isAdmin, isAuthenticated} = require("../middlewares/authUser")
const formMessages = require("../middlewares/formMessages")

const articlesRoute = express.Router()

//rotas publicas
articlesRoute.get("/articles/:slug", ArticleController.readArticle)
articlesRoute.get("/articles/category/:slug", ArticleController.categoryArticles)

// rotas admin
articlesRoute.get("/admin/articles",isAuthenticated,isAdmin, ArticleController.findAll)
articlesRoute.get("/admin/articles/page/:page",isAuthenticated,isAdmin, ArticleController.findAll)
articlesRoute.get("/admin/articles/user",isAuthenticated,isAdmin, ArticleController.articlesUser)
articlesRoute.get("/admin/articles/new",isAuthenticated,isAdmin,formMessages,ArticleController.new)
articlesRoute.get("/admin/articles/edit/:id",isAuthenticated,isAdmin,formMessages,ArticleController.edit)
articlesRoute.post("/admin/articles/update/:id",isAuthenticated,isAdmin, ArticleController.update)
articlesRoute.post("/admin/articles/delete",isAuthenticated,isAdmin, ArticleController.delete)
articlesRoute.post("/admin/articles/save",isAuthenticated,isAdmin, ArticleController.create)

module.exports = articlesRoute