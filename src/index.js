const express = require("express")
const dbConnection = require("./database/database")
const bodyParser = require("body-parser")
const routes = require("./apps/core/routers")

dbConnection.authenticate()
    .then(() => console.log("DB conectado ..."))
    .catch( error => console.log("Erro ao conectar DB: ", error))

const app = express()

app.set("views", __dirname + "/views")
app.set('view engine', 'ejs')

console.log(__dirname + "views")

app.use(express.static("public"))

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

routes(app)


app.listen(3000, () =>{
    console.log("Servidor inicializado ...")
})