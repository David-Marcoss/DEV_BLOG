
class ArticleControler{

    static article(req,res){

        //res.render("articles")
        res.status(200).send("Rota artigos")
    }
}

module.exports = ArticleControler