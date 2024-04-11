const Category = require("./categoryModel")
const Slugify = require("slugify")
const pagination = require("../utils/pagination")

class CategoryControler{

    static new(req,res){
        res.render("admin/category/new")
    }

    static findAll(req,res){

        let page = 0

        if(req.params.page){
            page = req.params.page
        }
        pagination(Category,page,8).then( result => {

            if (page <= result.numPages){
                res.render("admin/category/index",{
                    categories: result.data,
                    page: page,
                    next: result.next, 
                    numPages: result.numPages,
                    url: "/admin/categories"
                })
            }else{
                res.redirect("/admin/categories")
            }
        })
    }

    static create(req,res){

        const titulo =  req.body.titulo

        if (titulo){
            Category.create(
                {
                    name: titulo,
                    slug: Slugify(titulo)
                }
            ).then(
                () => res.redirect("/admin/categories")
            )
            .catch( 
                error => res.status(500).send("Não foi possivel conclui operação !!!") 
            )

        }else{
            res.redirect("admin/category/new")

        }
    }

    static edit(req, res){

        const id = req.params.id

        if(id){
            Category.findOne(
                { where:{ id: id } }
            )
            .then(
                category => res.render("admin/category/edit",{category})
            )
            .catch( e =>
                res.redirect("admin/categories")
            )
            
        }else{
            res.status(404).send("Não foi possivel realizar operação !!!")
        }

    }

    static update(req, res) {
        const id = req.params.id;
        const titulo = req.body.titulo;

        console.log("here", id, "-", titulo)
    
        if (id && titulo) {
            Category.update(
                {
                    name: titulo,
                    slug: Slugify(titulo)
                }, 
                {
                    where: {id: id}

                }
            )
            .then(
                () => res.redirect("/admin/categories")
            )
            .catch(
                error => res.status(500).send("Não foi possível concluir a operação!!!")
            )

        } else {
            res.redirect("admin/category/edit")
        }
    }

    static delete( req, res){
        const id = req.body.id

        if( !isNaN(id) ){
            Category.findByPk(id).then(
                    () => Category.destroy({where:{ id: id}}).then(
                            () => res.redirect("/admin/categories")
                    )
                ).catch(
                    () => res.redirect("/admin/categories")
                )
        }else{
            res.redirect("/admin/categories")
        }
    }
    
}

module.exports = CategoryControler