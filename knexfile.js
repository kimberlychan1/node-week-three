// Update with your config settings.

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      database: 'login',
      user:     'kimberly',
      password: 'apple'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'login',
      user:     'kimberly',
      password: 'apple'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'login',
      user:     'kimberly',
      password: 'apple'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
