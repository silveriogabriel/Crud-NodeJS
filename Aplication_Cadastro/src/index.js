const express = require("express")
const app = express()
require("dotenv").config()

const protocol = process.env.PROTOCOL || "http" // http or https
const ip = require('ip').address() // Pegando enderesso ip
const port = process.env.PORT || 4001 // Porta do servidor

const routes = require('./routes')
app.use(routes) // Ultilizando as rotas

app.listen(port, () => console.log(`
    Server esta rodando em http://localhost:${port} or ${protocol}://localhost:${ip}:${port}
`)) // Iniciando porta e ip do servidor
