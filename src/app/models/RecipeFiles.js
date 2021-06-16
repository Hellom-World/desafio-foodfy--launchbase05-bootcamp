const db = require('../../config/db')

module.exports ={
    findFileForId(id) {
        try {
          return db.query(`SELECT * FROM files WHERE id = $1`, [id])
        } catch (error) {
          console.log(error)
        }
    },
    findFileForIdRecipe(id) {
      try {
        return db.query(`SELECT recipe_files.file_id
        FROM recipe_files
        WHERE recipe_files.recipe_id = $1`, [id])
      } catch (error) {
        console.log(error)
      }
    },
    allFiles(){
      try{
        return db.query(`
          SELECT *
          FROM files
        `)
      } catch (error) {
        console.log(error)
      }
    }
}