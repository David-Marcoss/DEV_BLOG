const Category = require("./categoryModel")
const Slugify = require("slugify")

class CategoryControler{

    static form(req,res){
        res.render("admin/category/form")
    }

    static findAll(req,res){

        Category.findAll({row:true})
            .then( 
                categories => res.render("admin/category/categories",{categories})
            )
            .catch(
                error => res.status(500).send("Não foi possivel conclui operação !!!")
            )

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
            res.redirect("admin/category/form")

        }
    }

    static updateForm(req, res){

        const id = req.params.id

        if(id){
            Category.findOne(
                { where:{ id: id } }
            )
            .then(
                category => res.render("admin/category/formUpdate",{category})
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
            res.redirect("admin/category/form")
        }
    }

    static delete( req, res){
        const id = req.body.id

        if(id){
            Category.findOne(
                    {where:{ id: id} }
                )
                .then(
                    category =>{
                        if (category){
                            Category.destroy(
                                {where:{ id: id}}
                            )
                            .then(
                                () => res.redirect("/admin/categories")
                            )
                        }else{
                            res.status(404).send("Categoria não encontrada !!!")
                        }
                    }
                )
                .catch(
                    error => res.status(404).send("Categoria não encontrada !!!")
                )
        }else{
            res.status(404).send("Não foi possivel realizar operação !!!")
        }
    }
    
}

module.exports = CategoryControler