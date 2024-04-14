const dbConnection = require("../../database/database");
const Sequelize = require("sequelize"); // importar o sequelize
const Category =  require("../categories/categoryModel");
const User = require("../user/userModel");


const Article = dbConnection.define("articles", {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    slug: {
        type: Sequelize.STRING,
        allowNull: false
    },
    body:{
        type: Sequelize.TEXT,
        allowNull: false
    }

})

// relacionamento 1 p 1
Article.belongsTo(Category)
Article.belongsTo(User)

// relacionamento 1 p M
Category.hasMany(Article)
User.hasMany(Article)



module.exports = Article

