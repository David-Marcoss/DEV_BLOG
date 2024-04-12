const express = require("express")
const dbConnection = require("./database/database")
const bodyParser = require("body-parser")
const session = require("express-session")
const routes = require("./apps/core/routers")
const { isAuthenticated } = require("./apps/middlewares/authUser")

//cria app
const app = express()

// conexão db
dbConnection.authenticate()
    .then(() => console.log("DB conectado ..."))
    .catch( error => console.log("Erro ao conectar DB: ", error))


// config views
app.set("views", __dirname + "/views")
app.set('view engine', 'ejs')


// config static files
app.use(express.static("public"))

// config body parser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// config sessions
app.use(
    session({
      secret: "DevBlogSecret",
      saveUninitialized: false,
      resave: false,
      cookie: {
        maxAge: 1000 * 60 * 100,
      },
    })
);

// adciona middeleware verifica autenticação
app.use(isAuthenticated)

// cria rotas
routes(app)


module.exports = app