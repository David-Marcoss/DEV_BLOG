const express = require("express")
const dbConnection = require("./database/database")
const bodyParser = require("body-parser")


dbConnection.authenticate()
    .then(() => console.log("DB conectado ..."))
    .catch( error => console.log("Erro ao conectar DB: ", error))

const app = express()

app.set("views", __dirname + "/views")
app.set('view engine', 'ejs')

app.use(express.static("public"))

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get("/", (req,res) =>{

    res.render("index")
})

app.listen(3000, () =>{
    console.log("Servidor inicializado ...")
})