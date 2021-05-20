const { age, date } = require('../../lib/utils')
const db = require('../../config/db')

module.exports = {
    all(callback){

        db.query(`SELECT * FROM recipes`, function(err, results){
            if(err) return res.send("Database Error!")

            callback(results.rows)
        })

    }
}