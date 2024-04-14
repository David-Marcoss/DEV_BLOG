const Category = require("./categoryModel");
const Slugify = require("slugify");
const pagination = require("../utils/pagination");

class CategoryControler {

    static new(req, res) {
        res.render("admin/category/new");
    }

    static async findAll(req, res) {
        let page = 0;

        if (req.params.page) {
            page = req.params.page;
        }

        try {
            const result = await pagination(Category, page, 8);

            if (page <= result.numPages) {
                res.render("admin/category/index", {
                    categories: result.data,
                    page: page,
                    next: result.next,
                    numPages: result.numPages,
                    url: "/admin/categories"
                });
            } else {
                res.redirect("/admin/categories");
            }
        } catch (error) {
            res.status(500).send("Erro ao buscar categorias");
        }
    }

    static async create(req, res) {
        const titulo = req.body.titulo;

        if (titulo) {
            try {
                await Category.create({
                    name: titulo,
                    slug: Slugify(titulo)
                });
                res.redirect("/admin/categories");
            } catch (error) {
                res.status(500).send("Não foi possível concluir operação !!!");
            }
        } else {
            res.redirect("admin/category/new");
        }
    }

    static async edit(req, res) {
        const id = req.params.id;

        if (id) {
            try {
                const category = await Category.findOne({ where: { id: id } });
                res.render("admin/category/edit", { category });
            } catch (error) {
                res.redirect("admin/categories");
            }
        } else {
            res.status(404).send("Não foi possível realizar operação !!!");
        }
    }

    static async update(req, res) {
        const id = req.params.id;
        const titulo = req.body.titulo;

        console.log("here", id, "-", titulo);

        if (id && titulo) {
            try {
                await Category.update(
                    {
                        name: titulo,
                        slug: Slugify(titulo)
                    },
                    {
                        where: { id: id }
                    }
                );
                res.redirect("/admin/categories");
            } catch (error) {
                res.status(500).send("Não foi possível concluir a operação!!!");
            }
        } else {
            res.redirect("admin/category/edit");
        }
    }

    static async delete(req, res) {
        const id = req.body.id;

        if (!isNaN(id)) {
            try {
                await Category.destroy({ where: { id: id } });
                res.redirect("/admin/categories");
            } catch (error) {
                res.redirect("/admin/categories");
            }
        } else {
            res.redirect("/admin/categories");
        }
    }
}

module.exports = CategoryControler;
