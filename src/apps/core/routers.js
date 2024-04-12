const indexControler   =  require("../core/indexController")
const categoriesRouter = require("../categories/categoryRouter")
const articlesRouter   = require("../articles/articleRouter")
const usersRouter = require("../user/userRouter")
const adminRouter = require("../admin/adminRouter")


const routes = (app) => {
    app.route("/").get(indexControler.index)
    app.route("/home/page/:page").get(indexControler.index)
    app.use(
        categoriesRouter,
        articlesRouter,
        usersRouter,
        adminRouter
    )
}

module.exports = routes