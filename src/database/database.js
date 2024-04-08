const Sequelize = require("sequelize")
require("dotenv").config();

const DB_NAME = process.env.DB_NAME
const DB_HOST = process.env.DB_HOST
const DB_PORT = process.env.DB_PORT
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD

const dbConnection = new Sequelize(DB_NAME,DB_USER,DB_PASSWORD,{
    dialect: "mysql",
    host: DB_HOST,
    port: DB_PORT
})

module.exports = dbConnection





