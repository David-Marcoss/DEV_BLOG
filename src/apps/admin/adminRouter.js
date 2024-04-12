const express = require("express")
const AdminController = require("./adminController")

const adminRouter = express.Router()

adminRouter.get("/admin",AdminController.index)


module.exports = adminRouter