const Category = require("../categories/categoryModel")
const Article = require("./articleModel")
const Slugify = require("slugify")
const moment = require("moment");
const pagination = require("../utils/pagination");
const User = require("../user/userModel");
const { default: slugify } = require("slugify");

class ArticleControler {

    // Renderiza página de leitura de artigo
    static async readArticle(req, res) {
        const slug = req.params.slug;

        try {
            const article = await Article.findOne({
                where: { slug: slug },
                include: [{ model: Category }, { model: User } ]
            });

            if (article) {
                const date = moment(article.category.createdAt).format('DD/MM/YYYY');
                const categories = await Category.findAll({ raw: true });
                res.render("articlePage", { article, date, categories });
            } else {
                res.redirect("/");
            }
        } catch (error) {
            res.redirect("/");
        }
    }

    // Renderiza página com artigos filtrados por categoria
    static async categoryArticles(req, res) {
        const slug = req.params.slug;

        try {
            const category = await Category.findOne({
                where: { slug: slug },
                include: [{ model: Article }]
            });

            if (category) {
                const categories = await Category.findAll({ raw: true });
                res.render("articlesCategory", {
                    articles: category.articles,
                    categories: categories,
                    category: category,
                });
            } else {
                res.redirect("/");
            }
        } catch (error) {
            res.redirect("/");
        }
    }

    static async findAll(req, res) {
        let page = 0;

        if (req.params.page) {
            page = req.params.page;
        }

        try {
            const result = await pagination(Article, page, 8, [Category,User]);

            if (page <= result.numPages) {
                res.render("admin/articles/", {
                    articles: result.data,
                    page: page,
                    next: result.next,
                    numPages: result.numPages,
                    url: "/admin/articles"
                });
            } else {
                res.redirect("/admin/articles/");
            }
        } catch (error) {
            res.redirect("/admin/articles/");
        }
    }

    static async new(req, res) {
        try {
            const categories = await Category.findAll({ raw: true });
            
            res.render("admin/articles/new", { categories, user: req.session.user });
       
        } catch (error) {
            res.redirect("admin/articles/index");
        }
    }

    static async create(req, res) {
        const {title, body, categoryId, userId} = req.body;
        const slug = slugify(title)

        console.log(req.body)

        
        if (title && body && categoryId && userId) {
            try {

                if (User.findByPk(userId) != undefined){
                    await Article.create({
                        title,
                        body,
                        categoryId,
                        userId,
                        slug
                    });
                    res.redirect("/admin/articles");
                }
            
            }catch(error) {
                res.status().send(error);
            }
        } else {
            res.redirect("/admin/articles/new");
        }
    }

    static async delete(req, res) {
        const id = req.body.id;

        if (!isNaN(id)) {
            try {
                await Article.destroy({ where: { id: id } });
                res.redirect("/admin/articles");
            } catch (error) {
                res.status(500).send("Não foi possível concluir operação !!!");
            }
        } else {
            res.redirect("/admin/articles");
        }
    }

    static async edit(req, res) {
        const id = req.params.id;

        if (!isNaN(id)) {
            try {
                const article = await Article.findOne({
                    where: { id: id },
                    include: [{ model: Category }]
                });
                const categories = await Category.findAll({ raw: true });
                res.render("admin/articles/edit", { article, categories });
            } catch (error) {
                res.redirect("admin/articles");
            }
        } else {
            res.status(404).send("Não foi possível realizar operação !!!");
        }
    }

    static async update(req, res) {
        const id = req.params.id;
        const title = req.body.title;
        const body = req.body.body;
        const categoryId = req.body.category;
        const slug = Slugify(title);

        if (id && title && body && categoryId) {
            try {
                const article = await Article.findByPk(id);
                if (article) {
                    await Article.update({
                        title,
                        body,
                        categoryId,
                        slug
                    }, {
                        where: { id }
                    });
                    res.redirect("/admin/articles");
                } else {
                    res.redirect("/admin/articles");
                }
            } catch (error) {
                res.status().send(error);
            }
        } else {
            res.redirect("/admin/articles");
        }
    }
}

module.exports = ArticleControler;
