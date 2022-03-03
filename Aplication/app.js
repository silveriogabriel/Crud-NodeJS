//ultilizando express
const express = require('express');
const short = require('shortid')
const app = express();

app.use(express.json())

const vendas = [];

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
        data,
        itens
    }
    return response.json({'mensagem' : 'Produto alterado com sucesso'})
});

app.delete("/vendas/:id", (request, response) => {
    const {id} = request.params
    const vendasindex = vendas.findIndex(venda => venda.id === id);

    vendas.splice(vendasindex, 1);
    return response.json({'mensagem': 'Produto removido com sucesso'})
})



app.listen(4001, () => console.log('Servidor rodando na porta 4001'));