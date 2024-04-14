const express = require("express")
const AdminController = require("./adminController")
const UserController = require("../user/usersController")

const adminRouter = express.Router()

adminRouter.get("/admin",AdminController.index)
adminRouter.get("/admin/users",UserController.findAll)


module.exports = adminRouter