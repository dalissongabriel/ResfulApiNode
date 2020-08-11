const express = require('express')

const routes = express.Router()
const Users = require('./controllers/UserController')
const Projects = require('./controllers/ProjectController')



routes
    // Users
    .get('/users', Users.index)
    .get('/users/:id', Users.show)
    .post('/users', Users.create)
    .put('/users/:id', Users.update)
    .delete('/users/:id', Users.delete)
    // Projects
    .get('/projects', Projects.index)
    .get('/projects/:id', Projects.show)
    .post('/projects', Projects.create)
    .put('/projects/:id', Projects.update)
    .delete('/projects/:id', Projects.delete)


module.exports = routes