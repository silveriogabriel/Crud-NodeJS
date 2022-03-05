const express = require('express')
const router = express.Router()
const Cadastro = require('../models/Cadastro')

router.get('/', (req, res) => {
    res.send('Paginas Backend: /cadastro /usuarios /deletar/id')
})

router.post("/cadastrar", (req, res) => {
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
})

router.get("/show", (request, response) => {
    Cadastro.findAll({order: [['id', 'DESC']]}).then(function(usuarios){
        response.send(usuarios)
    })
})

router.get("/deletar/:id", function(req,res) {
    Cadastro.destroy({where: {'id': req.params.id}}).then(function(){
        res.send("Postagem deletada com sucesso!")
    }).catch(function(){
        res.send("Usuario ID desconhecido!")
    })
})
//Fim Rotas

module.exports = router