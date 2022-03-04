const db = require('./db')

//Model Vendas
const Vendas = db.sequelize.define('vendas', {
    produto : {
        type: db.Sequelize.STRING
    },
    valor : {
        type: db.Sequelize.FLOAT
    }
})

//Vendas.sync({ force: true })

module.exports = Vendas