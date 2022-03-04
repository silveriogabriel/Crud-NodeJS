const Sequelize = require('sequelize');

//Iniciando conexao com BD
const sequelize = new Sequelize('cadastro', 'root', '', {
    host: "localhost",
    dialect: 'mysql'
})

//Exportando modulos para o app.js
module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}