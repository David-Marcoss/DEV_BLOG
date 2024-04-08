const indexControler   =  require("../core/indexController")
const categoriesRouter = require("../categories/categoryRouter")
const articlesRouter   = require("../articles/articleRouter")


const routes = (app) => {
    app.route("/").get(indexControler.index)
    app.use(
        categoriesRouter,
        articlesRouter
    )
}

module.exports = routes