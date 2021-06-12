const { age, date } = require('../../lib/utils')
const db = require('../../config/db')

module.exports = {
    all(callback){

        db.query(`SELECT recipes.*, chefs.name AS chef_name
        FROM recipes
        LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
        ORDER BY title ASC`, function(err, results){
            if(err) throw `database Error! ${err}`  

            callback(results.rows)
        })

    },
    create(data, callback){
        const query = `
        INSERT INTO recipes (
            chef_id,
            title,
            ingredients,
            preparation,
            information,
            created_at
        ) VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id
    `

        const values = [
            data.chef_id,
            data.title,
            data.ingredients,
            data.preparation,
            data.information,
            date(Date.now()).iso
        ]

        return db.query(query, values)
    },
    find(id, callback) {
        db.query(`SELECT recipes.*, chefs.name AS chef_name
        FROM recipes
        LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
        WHERE recipes.id = $1`, [id], function(err, results){  
            if(err) throw `database Error! ${err}`
            callback(results.rows[0])
        })
    },
    findBy(filter, callback) {
        db.query(`
        SELECT recipes.*, chefs.name AS chef_name
        FROM recipes
        LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
        WHERE recipes.title ILIKE '%${filter}%'`, function(err, results){
            if(err) throw `Dtabase Error! ${err}`

            callback(results.rows)
        })   
    },
    update(data, callback) {
        const query = `
        UPDATE recipes SET
            chef_id=($1),
            image=($2),
            title=($3),
            ingredients=($4),
            preparation=($5),
            information=($6),
            created_at=($7)
        WHERE id =($8)
        `
        const values = [
            data.chef_id,
            data.image,
            data.title,
            data.ingredients,
            data.preparation,
            data.information,
            date(Date.now()).iso,
            data.id
        ]

        db.query(query, values, function(err, results){
            if(err) throw `database Error! ${err}`

            callback()
        })
    },
    delete(id, callback) {
        db.query(`DELETE FROM recipes WHERE id = $1`, [id], function(err, results){
            if(err) throw `Database Error! ${err}`

            return callback()
        })
    },
    
    chefSelectOptions(callback) {
        db.query(`SELECT name, id FROM chefs`, function(err, results) {
            if (err) throw 'Database Error!'

            callback (results.rows)
        })
    }
    

}