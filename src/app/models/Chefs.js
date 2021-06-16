const { age, date } = require('../../lib/utils')
const db = require('../../config/db')

module.exports = {
    all(){

        try{ return db.query(`SELECT chefs.*, count(recipes) AS total_recipes
        FROM chefs
        LEFT JOIN recipes ON (recipes.chef_id = chefs.id)
        GROUP BY chefs.id
        ORDER BY total_recipes DESC`)
        } catch (error) { console.error(error)}
        

    },
    create(name, file_id){
        const query = `
        INSERT INTO chefs (
            name,
            created_at,
            file_id
        ) VALUES ($1, $2, $3)
        RETURNING id
    `

        const values = [
            name,
            date(Date.now()).iso,
            file_id
        ]

        return db.query(query, values)
    },
    update(data, callback) {
        const query = `
        UPDATE chefs SET
            name=($1),
            avatar_url=($2),
            created_at=($3)
        WHERE id =($4)
        `
        const values = [
            data.name,
            data.avatar_url,
            date(Date.now()).iso,
            data.id
        ]

        db.query(query, values, function(err, results){
            if(err) throw `database Error! ${err}`

            callback()
        })
    },
    find(id) {
     try{
         return db.query(`SELECT chefs.*, count(recipes) AS total_recipes
         FROM chefs
         LEFT JOIN recipes ON ( chefs.id = recipes.chef_id)
         WHERE chefs.id = $1
         GROUP BY chefs.id`, [id])
     } catch (error) { console.error(error)}
    },
    findChefRecipes(id){
        
        try { return db.query(`SELECT recipes.*, chefs.name AS chef_name
        FROM recipes
        LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
        WHERE chefs.id = $1`, [id])
        }   catch  (error) { console.error(error)}
    },
    delete(id, callback) {
        db.query(`DELETE FROM chefs WHERE id = $1`, [id], function(err, results){
            if(err) throw `Database Error! ${err}`

            return callback(), console.log(id)
        })
    },
}