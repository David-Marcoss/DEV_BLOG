const dbConnection = require("./database")
const Category = require("../apps/categories/categoryModel")
const Article = require("../apps/articles/articleModel")
const User = require("../apps/user/userModel")

// criar tabelas no banco de dados

dbConnection.authenticate()
    .then(() => console.log("DB conectado ..."))
    .catch( error => console.log("Erro ao conectar DB: ", error))


Category.sync({force: false}).then(() => {})
Article.sync({force: false}).then(() => {})
User.sync({force: false}).then(() => {})
