//Importando Modulos
    const express = require('express');
    const handlebars = require('express-handlebars');
    const short = require('shortid')
    const { ClientRequest } = require('http');
    const { json } = require('express/lib/response');
    const Cadastro = require('./models/Cadastro')
    const Venda = require('./models/Vendas')
    const db = require('./models/db')

//Verificando conexao com banco de dados
    db.sequelize.authenticate().then(function(){
        console.log('Conectado Com sucesso!')
    }).catch(function(erro){
        console.log('Falha ao se conectar: ' + erro)
    })

const app = express(); // Instanciando express

app.use(express.json()) // definindo que o express vai usar json

// Rota para cadastro de clientes 
    app.get('/', (req, res) => {
        res.send('Paginas Backend: /cadastro /usuarios /deletar/id')
    });

    app.post("/cadastro", (req, res) => {
        const {nome, cpf, endereco} = req.body;
        Cadastro.create({
            nome: JSON.stringify(nome),
            cpf: JSON.stringify(cpf),
            endereco: JSON.stringify(endereco)
        }).then(function(){
            res.send(`Cadastro do usuario ${nome} realizado com sucesso!`)
        }).catch(function(){
            res.send('Erro ao cadastrar!')
        })
    });

    app.get("/usuarios", (request, response) => {
        Cadastro.findAll({order: [['id', 'DESC']]}).then(function(usuarios){
            response.send(usuarios)
        })
    });

    app.get("/deletar/:id", function(req,res) {
        Cadastro.destroy({where: {'id': req.params.id}}).then(function(){
            res.send("Postagem deletada com sucesso!")
        }).catch(function(){
            res.send("Usuario ID desconhecido!")
        })
    });
//Fim Rotas

app.listen(4001, () => console.log('Servidor rodando na porta 4001')); //Rodando server