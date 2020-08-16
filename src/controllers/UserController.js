const knex = require("../database")

module.exports = {
    async index(req,res,next) {
        try {
            const {username, page = 1} = req.query
            const query = knex('users')
                .where('deleted_at', null)
                .limit(5)
                .offset((page - 1) * 5)
            if(username) {
                query.where({username})
            }
            const [count] = await knex('users').where('deleted_at',null).count()
            res.header('X-Total-Count', count["count"])
            const results = await query
            
            return res.json(results)
        } catch (error) {
            next(error)
        }
    },

    async show(req,res,next) {
        try {
            const { id } = req.params
            const results = await knex('users').where({id})
            return res.json(results)
        } catch (error) {
            next(error)
        }
    },
    async create(req,res,next) {
        try{
            const { username } = req.body
            await knex('users').insert({username})
            return res.status(201).send()
        } catch(error) {
            next(error)
        }
    },
    async update(req,res,next) {
        try {
            const { username } = req.body
            const { id } = req.params
            await knex('users')
                .update({username})
                .where({id})

            return res.send()
        } catch(error) {
            next(error)
        }
    },
    async delete(req,res,next) {    
        try {
            const { id } =  req.params
            await knex('users')
                .where( {id} )
                .update('deleted_at', new Date())
            return res.send()
        } catch (error) {
            next(error)
        }
    }
}