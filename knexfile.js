// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: 'knex_test',
      user: 'alisson',
      password: '1234'
    },
    migrations: {
      directory: `${__dirname}/src/database/migrations`
    }
  }
};
