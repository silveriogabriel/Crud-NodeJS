//Importando Modulos
    const express = require('express');
    const handlebars = require('express-handlebars');
    const short = require('shortid')
    const fs = require('fs')
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
// 'Banco de dados' inicial
    let vendas = []; 

    fs.readFile("vendas.json", "utf-8", (err, data) => {
        if(err) {
            console.log(err);
        }else{
        vendas = JSON.parse(data)
        }
    })
//Template Engine
    //app.engine('handlebars', handlebars({defaultLayout: 'main'}));
    //app.set('view engine', 'handlebars');

// Rotas 
    app.get('/', (req, res) => {
        res.send('Paginas Backend:<br> /cadastro<br> /usuarios')
    });

    app.post("/cadastro", (req, res) => {
        const {nome, cpf, endereco} = req.body;
        Cadastro.create({
            nome: JSON.stringify(nome),
            cpf: JSON.stringify(cpf),
            endereco: JSON.stringify(endereco)
        }).then(function(){
            res.send('Cadastro realizado com sucesso!')
        }).catch(function(){
            res.send('Erro ao cadastrar!')
        })
    });

    app.get("/usuarios", (request, response) => {
        Cadastro.findAll().then(function(usuarios){
            response.send(usuarios)
        })
    });

    app.get("/vendas/:id", (request, response) => {
        const{id} = request.params
        const venda = vendas.find(vendas => vendas.id === id);
        return response.json(venda)
    });

    app.put("/vendas/:id", (request, response) => {
        const{id} = request.params
        const {data, cliente, itens} = request.body;

        const vendasindex = vendas.findIndex(venda => venda.id === id);
        vendas[vendasindex] = {
            ...vendas[vendasindex],
            cliente,
            data,
            itens
        }
        createVendasFile()
        return response.json({'mensagem' : 'Produto alterado com sucesso'})
    });

    app.delete("/vendas/:id", (request, response) => {
        const {id} = request.params
        const vendasindex = vendas.findIndex(venda => venda.id === id);

        vendas.splice(vendasindex, 1);
        return response.json({'mensagem': 'Produto removido com sucesso'})
    });
//Fim Routes

//Escrevendo no micro 'BD'
function createVendasFile() {
    fs.writeFile("vendas.json", JSON.stringify(vendas), (err) => {
        if(err) {
            console.log(err);
        } else {
            console.log("Venda inserida!")
        }
    });
}


app.listen(4001, () => console.log('Servidor rodando na porta 4001')); //Rodando server