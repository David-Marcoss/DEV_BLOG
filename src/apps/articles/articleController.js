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
                const articles = await Article.findAll({
                    include: [{ model: User }],
                    order: [["id", "DESC"]],
                    where: { categoryId: category.id }
                });
                
                res.render("articlesCategory", {
                    articles: articles,
                    category: category,
                    categories: await Category.findAll({ raw: true })
                });
            } else {
                res.redirect("/");
            }
        } catch (error) {
            console.error("Erro ao buscar artigos por categoria:", error);
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
                res.render("admin/articles/index", {
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

    static async articlesUser(req, res) {
        const articles = await Article.findAll({
            include: [{ model: User }, { model: Category }],
            where: { userId: req.session.user.id },
        })

        console.log(articles)

        res.render("admin/articles/index", {
            articles,
        })
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
        const {title, resume ,body, categoryId, userId} = req.body;
        const slug = slugify(title)

        if (title && body && categoryId && userId) {
            try {

                if (User.findByPk(userId) != undefined){
                    await Article.create({
                        title,
                        resume,
                        body,
                        categoryId,
                        userId,
                        slug
                    });
                    res.redirect("/admin/articles/user");
                }
            
            }catch(error) {
                const info = {
                    error: true,
                    msg: { title: "Não foi possível concluir a operação tente novamente", 
                    body: "!!" }
                };
                res.redirect(`/admin/articles/new?info=${JSON.stringify(info)}`);
            }
        } else {
            const info = {
                error: true,
                msg: { title: "Não foi possível concluir a operação", 
                body: "preencha os campos corretamente!!" }
            };
            res.redirect(`/admin/articles/new?info=${JSON.stringify(info)}`);
        }
    }

    static async delete(req, res) {
        const id = req.body.id;

        if (!isNaN(id)) {
            try {
                await Article.destroy({ where: { id: id } });
                res.redirect("/admin/articles/user");
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
        const id = req.params.id
        const {title, resume ,body, categoryId} = req.body;

        const slug = Slugify(title);

        if (id && title && body && categoryId && resume) {
            try {
                const article = await Article.findByPk(id);

                if (article) {
                    await Article.update({
                        title,
                        resume,
                        body,
                        categoryId,
                        slug,
                    }, {
                        where: { id }
                    });

                    res.redirect("/admin/articles/user");

                } else {
                    const info = {
                        error: true,
                        msg: { title: "Não foi possível concluir a operação tente novamente", 
                        body: "Artigo não encontrado!!" }
                    };
                    res.redirect(`/admin/articles/edit/${id}?info=${JSON.stringify(info)}`);
                }
            } catch (error) {
                const info = {
                    error: true,
                    msg: { title: "Não foi possível concluir a operação tente novamente", 
                    body: "!!" }
                };
                res.redirect(`/admin/articles/edit/${id}?info=${JSON.stringify(info)}`);
            }
        } else {
            const info = {
                error: true,
                msg: { title: "Não foi possível concluir a operação tente novamente", 
                body: "preencha os campos corretamente!!" }
            };
            res.redirect(`/admin/articles/edit/${id}?info=${JSON.stringify(info)}`);
        }
    }
}

module.exports = ArticleControler;
