const knex = require("../database")

module.exports = {
    async index(req,res, next) {
        try {
            const { user_id, page = 1 } = req.query
            const query = knex('projects')
                .join('users','users.id','=','projects.user_id')
                .where('users.deleted_at',null)                
                .limit(5)
                .offset( (page - 1) * 5)
            const countObj = knex('projects')
                .count()
                .join('users','users.id','=','projects.user_id')
                .where('users.deleted_at',null)

            if(user_id){
                query
                    .select(
                        'projects.id',
                        'projects.title',
                        'projects.user_id',
                        'users.username',
                        'projects.created_at',
                        'projects.updated_at'
                        )
                    .join('users','users.id','=','projects.user_id')
                    .where({user_id})
                    .andWhere('users.deleted_at',null)

                countObj.where({user_id})
            }
            const [count] = await countObj
            res.header('X-Total-Count', count["count"])

            const results = await query
            return res.json(results)
        } catch (error) {
            next(error)
        }
    },
    async show(req, res, next) {
        try {
            const { id } = req.params
            const results = await 
                knex('projects')
                .join('users','users.id','=','projects.user_id')
                .where('projects.id',id)
                .andWhere('users.deleted_at',null)

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