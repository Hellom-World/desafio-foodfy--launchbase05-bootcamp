const { Pool } = require("pg")

                module.exports = new Pool({
                    user: 'postgres',
                    password: "shanti0408",
                    host: "localhost",
                    port: 5432,
                    database: "foodfy"  
                })
