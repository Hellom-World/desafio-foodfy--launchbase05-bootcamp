module.exports = {
    all(callback){

        db.query(`SELECT * FROM recipes`, function(err, results){
            if(err) return res.send("Database Error!")

            callback(results.rows)
        })

    },

    create(){

    }
}