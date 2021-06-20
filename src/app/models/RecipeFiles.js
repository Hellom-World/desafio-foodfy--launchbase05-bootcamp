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
    },
    allRecipesWithFileIdAndNameChef(){
      try{
        return db.query(`
        SELECT recipes.*, recipe_files.file_id as file_id, chefs.name as chef_name
        FROM recipes
        LEFT JOIN recipe_files ON (recipes.id = recipe_files.recipe_id)
        LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
        `)
      } catch (error) {
        console.log(error)
      }
    }
}