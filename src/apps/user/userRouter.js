const express = require("express")
const UserController = require("./usersController")
const {authorization} =  require("../middlewares/authUser")
const formMenssages = require("../middlewares/formMessages")
const usersRouter = express.Router()

usersRouter.get("/users/new",formMenssages,UserController.new)
usersRouter.post("/users/create",UserController.create)
usersRouter.get("/users/login",formMenssages,UserController.login)
usersRouter.post("/users/authentication",UserController.authentication)
usersRouter.get("/users/logout",authorization,UserController.logout)
usersRouter.get("/users/redefinePassword",formMenssages,authorization,UserController.redefinePassword)
usersRouter.post("/users/redefinePassword/save",authorization,UserController.updatePassword)


module.exports = usersRouter