//Importando Modulos

    const express = require('express');
    const handlebars = require('express-handlebars');
    const { ClientRequest } = require('http');
    const { json } = require('express/lib/response');
    const router = require('./routers/router')
    const db = require('./models/db')

//Verificando conexao com banco de dados

    db.sequelize.authenticate().then(function(){
        console.log('Conectado Com sucesso!')
    }).catch(function(erro){
        console.log('Falha ao se conectar: ' + erro)
    })

const app = express(); // Instanciando express

app.use(express.json()) // definindo que o express vai usar json

//Template Engine
    //app.engine('handlebars', handlebars({defaultLayout: 'main'}));
    //app.set('view engine', 'handlebars');

// Rotas 
    app.use('/users', router)//rotas de usuario


app.listen(4001, () => console.log('Servidor rodando na porta 4001')); //Rodando server