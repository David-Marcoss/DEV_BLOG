const express = require("express")
const ArticleController = require("./articleController")

const articlesRoute = express.Router()

articlesRoute.get("/articles", ArticleController.article)

module.exports = articlesRoute