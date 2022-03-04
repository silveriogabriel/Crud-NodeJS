//ultilizando express
const express = require('express');
const short = require('shortid')
const fs = require('fs')
const Sequelize = require('sequelize');
const { ClientRequest } = require('http');
const { json } = require('express/lib/response');
const sequelize = new Sequelize('usuarios', 'root', '12345', {
    host: "localhost",
    dialect: 'mysql'
})

const Cliente = sequelize.define('cliente', {
    nome: {
        type: Sequelize.STRING
    },
    cpf: {
        type: Sequelize.STRING
    },
    endereco: {
        type: Sequelize.STRING
    }
})

const Vendas = sequelize.define('vendas', {
    produto : {
        type: Sequelize.STRING
    },
    valor : {
        type: Sequelize.FLOAT
    }
})


sequelize.authenticate().then(function(){
    console.log('Conectado Com sucesso!')
}).catch(function(erro){
    console.log('Falha ao se conectar: ' + erro)
})

const app = express();


app.use(express.json())

let vendas = [];

fs.readFile("vendas.json", "utf-8", (err, data) => {
    if(err) {
        console.log(err);
    }else{
        vendas = JSON.parse(data)
    }
})

app.post("/vendas", (request, response) => {
    const {nome, cpf, endereco} = request.body;
    Cliente.create({
        nome: JSON.stringify(nome),
        cpf: JSON.stringify(cpf),
        endereco: JSON.stringify(endereco)
    })

    return response.json({
        message: "Cliente cadastrado com sucesso!"
    });
});

app.get("/vendas", (request, response) => {
    return response.json(vendas)
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



function createVendasFile() {
    fs.writeFile("vendas.json", JSON.stringify(vendas), (err) => {
        if(err) {
            console.log(err);
        } else {
            console.log("Venda inserida!")
        }
    });
}


app.listen(4001, () => console.log('Servidor rodando na porta 4001'));