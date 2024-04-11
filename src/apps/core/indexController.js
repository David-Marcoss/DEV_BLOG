const Article = require("../articles/articleModel")
const Category = require("../categories/categoryModel")
const pagination = require("../utils/pagination")

class IndexControler{

    static index(req,res){

        let page = 0

        if(req.params.page){
            page = req.params.page
        }
        
        pagination(Article,page,5,Category).then( result => {

            Category.findAll({row: true}).then( categories =>{
                
                if (page <= result.numPages){
                    res.render("index",{
                        articles: result.data,
                        categories: categories,
                        page: page,
                        next: result.next, 
                        numPages: result.numPages,
                        url: "/home"
                    })
                }else{
                    res.redirect("/")
                }

            })

        })

    }
}

module.exports = IndexControler