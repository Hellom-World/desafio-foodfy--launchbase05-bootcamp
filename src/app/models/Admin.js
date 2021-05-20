const { age, date } = require('../../lib/utils')
const db = require('../../config/db')

module.exports = {
    all(callback){

        db.query(`SELECT * FROM recipes`, function(err, results){
            if(err) return res.send("Database Error!")

            callback(results.rows)
        })

    },
    create(data, callback){
        const query = `
        INSERT INTO recipes (
            chef_id,
            image,
            title,
            ingredients,
            preparation,
            information,
            created_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING id
    `

        const values = [
            data.chef_id,
            data.image,
            data.title,
            data.ingredients,
            data.preparation,
            data.information,
            date(Date.now()).iso
        ]

        db.query(query, values, function(err, results){
            if(err) return res.send("Database Error!")

            callback(results.rows[0])
        })
    },
    find(id, callback) {
        db.query(`SELECT *
        FROM recipes
        WHERE id = $1`, [id], function(err, results){
            if(err) throw `database Error! ${err}`
            callback(results.rows[0])
        })
    },
}