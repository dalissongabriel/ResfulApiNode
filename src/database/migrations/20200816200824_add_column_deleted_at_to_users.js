exports.up = async knex => knex.schema
    .alterTable('users',(table)=>{
        table.timestamp('deleted_at')
})

exports.down = knex => knex.schema
    .alterTable('users', (table) => {
        table.dropColumn('deleted_at')
    })
