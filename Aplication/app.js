//ultilizando express
const express = require('express');
const short = require('shortid')
const fs = require('fs')

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

/**
 * Post = inserir dados 
 * Get = Buscar dados
 * Put = alterar dado
 * delete = apagar
 * Body = sempre que eu quiser enviar dados para minha aplicacao
 * parametros = /produtos?/asdfsfgwegeg - obrigatorio
 * query = /produtos?id=EFWEF&ID=AEFJWKFJ
 */

app.post("/vendas", (request, response) => {
    const {data, cliente, itens} = request.body;
    const venda ={
        id: short(),
        data,
        cliente,
        itens
    }
    vendas.push(venda);
    createVendasFile()

    return response.json(venda);
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