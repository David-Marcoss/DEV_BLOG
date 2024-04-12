const dbConnection = require("../../database/database");
const Sequelize = require("sequelize"); // importar o sequelize


const User = dbConnection.define("users", {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },

    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    password : {
        type: Sequelize.STRING,
        allowNull: false
    },

    isAdmin:{
        type: Sequelize.BOOLEAN,
        default: false,
        allowNull: false
    }

})


module.exports = User

