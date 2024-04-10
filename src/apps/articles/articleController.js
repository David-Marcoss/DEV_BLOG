const Category = require("../categories/categoryModel")
const Article = require("./articleModel")
const Slugify = require("slugify")

class ArticleControler{

    static findAll(req,res){
        
        Article.findAll(
            {
                row:true,
                include:[{"model": Category}]
            },
        ).then( 
            articles => res.render("admin/articles/index",{articles})
        ).catch(
            error => res.status(500).send("Não foi possivel conclui operação !!!")
        )
        
    }

    static new(req,res){
        
        Category.findAll({row: true})
            .then( categories =>{
                res.render("admin/articles/new",{categories})

            }).catch(()=>{
                res.redirect("admin/articles/index")    
            })
    }

    static create(req,res){ 
        const title = req.body.title
        const body = req.body.body
        const categoryId = req.body.category
        const slug = Slugify(title)


        if( title&& body && categoryId){
            console.log("wsada")

            Article.create({
                title,
                body,
                categoryId,
                slug
            }).then(()=>{
                console.log("wsada")
                res.redirect("/admin/articles")
            }).catch((error)=>{
                res.status().send(error)
                //res.redirect("/admin/articles/new")
            })

        }else{
            res.redirect("/admin/articles/new")
        }
    }


    static delete(req,res){
        const id = req.body.id
        if ( !isNaN(id) ){
            Article.findByPk(id).then( 
                () => Article.destroy({where:{ id: id }})
            ).then(
                () => res.redirect("/admin/articles")
            ).catch(
                error => res.status(500).send("Não foi possivel conclui operação !!!")
            )
        }else{
            res.redirect("/admin/articles")
        }
        
    }

    static edit(req, res){
        const id = req.params.id

        if(!isNaN(id)){
            Article.findOne(
                { 
                    where:{ id: id },
                    include:[{"model": Category}]
                }
            )
            .then(
                article => res.render("admin/articles/edit",{article})
            )
            .catch( e =>
                res.redirect("admin/articles")
            )
        }else{
            res.status(404).send("Não foi possivel realizar operação !!!")
        }

    }

}

module.exports = ArticleControler