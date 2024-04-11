const Category = require("../categories/categoryModel")
const Article = require("./articleModel")
const Slugify = require("slugify")
const moment = require("moment");
const pagination = require("../utils/pagination")

class ArticleControler{

    //renderiza pagina de leitura de artigo
    static readArticle(req,res){

        const slug = req.params.slug

        Article.findOne({
            where:{slug:slug},
            include: [{model: Category}]
        }).then( article =>{
            
            if (article){

                const date = moment(article.category.createdAt).format('DD/MM/YYYY')

                Category.findAll({row: true}).then( categories =>{
                    res.render("articlePage",{article,date,categories})

                }).catch(()=>{
                    res.redirect("admin/articles/index")    
                })
                
            }else{
                res.redirect("/")
            }
        }).catch( () => 
            res.redirect("/")
        )   

    }

    //renderiza pagina com artigos filtrados por categoria
    static categoryArticles(req,res){

        const slug = req.params.slug

        Category.findOne({
            where:{slug:slug},
            include: [{model: Article}]
        }).then( category =>{
            
            if (category){

                Category.findAll({row: true}).then( categories =>{
                    res.render("articlesCategory",{
                        articles: category.articles,
                        categories:categories,
                        category: category,
                    })

                }).catch(()=>{
                    res.redirect("/")    
                })
                
            }else{
                res.redirect("/")
            }
        }).catch( () => 
            res.redirect("/")
        )   

    }

    static findAll(req,res){
        let page = 0

        if(req.params.page){
            page = req.params.page
        }
        
        pagination(Article,page,8,Category).then( result => {

            if (page <= result.numPages){
                res.render("admin/articles/",{
                    articles: result.data,
                    page: page,
                    next: result.next, 
                    numPages: result.numPages,
                    url: "/admin/articles"
                })
            }else{
                res.redirect("/admin/articles/")
            }
        })
        
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

            Article.create({
                title,
                body,
                categoryId,
                slug
            }).then(()=>{

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
                article => {
                    Category.findAll({row: true}).then( categories =>{
                        res.render("admin/articles/edit",{
                            article,
                            categories,
                        })
    
                    }).catch(()=>{
                        res.redirect("/")    
                    })   
                }
            )
            .catch( e =>
                res.redirect("admin/articles")
            )
        }else{
            res.status(404).send("Não foi possivel realizar operação !!!")
        }

    }

    static update(req,res){ 
        const id = req.params.id
        const title = req.body.title
        const body = req.body.body
        const categoryId = req.body.category
        const slug = Slugify(title)

        if( id && title && body && categoryId){
            
            Article.findByPk(id).then( article => {

                if (article){
                    Article.update({
                        title,
                        body,
                        categoryId,
                        slug
                    },{
                        where: {id}
                    }).then(()=>{
                        
                        res.redirect("/admin/articles")

                    }).catch((error)=>{
                        res.status().send(error)
                    })
                }else{
                    res.redirect("/admin/articles")
                }
                

            }).catch( error => 
                res.redirect("/admin/articles")
            )

        }else{
            res.redirect("/admin/articles")
        }
    }
}

module.exports = ArticleControler