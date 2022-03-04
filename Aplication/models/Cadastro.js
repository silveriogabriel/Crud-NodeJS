const db = require('./db')

//Model Cadastro
const Cadastro = db.sequelize.define('cadastro', {
    nome: {
        type: db.Sequelize.STRING
    },
    cpf: {
        type: db.Sequelize.STRING
    },
    endereco: {
        type: db.Sequelize.STRING
    }
})

//Cadastro.sync({ force: true })

module.exports = Cadastro