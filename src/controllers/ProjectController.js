const knex = require("../database")
const { andWhereRaw } = require("../database")

module.exports = {
    async index(req,res, next) {
        try {
            const { user_id } = req.query
            const query = knex('projects')
            if(user_id){
                query
                    .select('projects.*','users.username')
                    .join('users','users.id','=','projects.user_id')
                    .where({user_id})

            }
            const results = await query
            return res.json(results)
        } catch (error) {
            next(error)
        }
    },
    async create(req,res,next) {
        try{
            const { title, user_id } = req.body
            await knex('projects').insert({title, user_id})
            return res.status(201).send()
        } catch(error) {
            next(error)
        }
    },
    async update(req,res,next) {
        try {
            const { title, user_id } = req.body
            const { id } = req.params
            await knex('projects')
                .update({title, user_id})
                .where({id})
            return res.send()
        } catch(error) {
            next(error)
        }
    },
    async delete(req,res,next) {    
        try {
            const { id } =  req.params
            await knex('projects')
                .where( {id} )
                .del()
            return res.send()
        } catch (error) {
            next(error)
        }
    }
}