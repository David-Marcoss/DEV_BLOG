const Article = require("../articles/articleModel")
const Category = require("../categories/categoryModel")

class IndexControler{

    static index(req,res){

        Article.findAll(
            {
                row:true,
                include:[{"model": Category}],
                order: [["id","DESC"]]
            },
        ).then( 
            articles => {
                Category.findAll({row: true}).then( categories =>{
                    res.render("index",{articles,categories})
                })
            }
        ).catch(
            error => res.status(500).send("Não foi possivel conclui operação !!!")
        )
    }
}

module.exports = IndexControler