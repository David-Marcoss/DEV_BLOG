const Category = require("./categoryModel")
const Slugify = require("slugify")

class CategoryControler{

    static form(req,res){
        res.render("admin/category/form")
    }

    static create(req,res){

        const titulo =  req.body.titulo

        if (titulo){
            Category.create({
                    name: titulo,
                    slug: Slugify(titulo)
                }
            ).then(() => res.redirect("/"))
            .catch( error => res.status(500).send("Não foi possivel conclui operação !!!") )

        }else{
            res.redirect("admin/category/form")

        }
    }
}

module.exports = CategoryControler