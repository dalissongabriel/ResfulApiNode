const express = require('express')
const app = express()
const knex = require('./database')

app.get('/users', (req,res)=> knex('users').then((results)=>res.json(results)))

app.listen(3000, ()=> console.log("Servidor está rodando!")) 