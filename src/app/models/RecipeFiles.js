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
        SELECT files.*, recipe_files.recipe_id as recipe_id
        FROM files
        LEFT JOIN recipe_files ON (files.id = recipe_files.file_id)
        `)
      } catch (error) {
        console.log(error)
      }
    },
    allRecipeFiles(){
      try{
        return db.query(`
        SELECT  *
        FROM recipe_files
        `)
      } catch (error) {
        console.log(error)
      }
    },
    allRecipes(){
      try{
        return db.query(`
        SELECT recipes.*, chefs.name as chef_name
        FROM recipes
        
        LEFT JOIN chefs ON (recipes.chef_id = chefs.id)`)
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