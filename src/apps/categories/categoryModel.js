const dbConnection = require("../../database/database");
const Sequelize = require("sequelize"); // importar o sequelize


const Category = dbConnection.define("categories", {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    slug: {
        type: Sequelize.STRING,
        allowNull: false
    },

})


module.exports = Category

