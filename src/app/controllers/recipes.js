const { age, date } = require('../../lib/utils')
const db = require('../../config/db')
const Recipes = require ('../models/Recipes')
const File = require('../models/File')
const RecipeFiles = require('../models/RecipeFiles')

module.exports = {
    index(req, res){
        Recipes.all(function(recipes) {
            
            return res.render("admin/recipes/index.njk", {recipes})
    
        })
    },
    create(req, res){
        Recipes.chefSelectOptions(function(options){
            return res.render('admin/recipes/create.njk', {chefOptions: options})
        })
    },      
async post(req, res){
    const keys = Object.keys(req.body)

    for(key of keys) {
        if (req.body[key] == "") {
            return res.send('please, fill all fields')
        }
    }
    if(req.files.length == 0)
        return res.send('please, send at least one image')
    
    /* const recipeId = results.rows[0].id */
    
    const filesPromise = req.files.map(file => File.create({...file}))
	await Promise.all(filesPromise)
    console.log(filesPromise)
/* 
    let resultsFile = await File.create(...req.files)
    const file_id = resultsFile.rows[0].id */
    
    let resultsRecipes = await Recipes.create(req.body)
    const recipe_id = resultsRecipes.rows[0].id

    await RecipeFiles.create(recipe_id, file_id)
    

    
    
        return res.redirect(`/admin/recipes/${recipes_id}/edit`)
    
},
    show(req, res){
        Recipes.find(req.params.id, function (recipe){
            if (!recipe) return res.send("recipe not found!")

            recipe.created_at = date(recipe.created_at).format
        
        return res.render('admin/recipes/show.njk', {recipe})  
        })
    },                
    edit(req, res){
        Recipes.find(req.params.id, function (recipe){
            if (!recipe) return res.send("recipe no found!")

            Recipes.chefSelectOptions(function(options){
                return res.render(`admin/recipes/edit.njk`, {recipe, chefOptions: options})
            })
        })
       
    }, 
    put(req, res){
        const keys = Object.keys(req.body)

        for(key of keys) {
            if (req.body[key] == "") {
                return res.send("Please, fill all fields!")
            }
        }
        
            Recipes.update(req.body, function() {
                return res.redirect(`/admin/recipes/${req.body.id}`)
            })
        
    },   
    delete(req, res){
        
        Recipes.delete(req.body.id, function(){
            return res.redirect(`/admin/recipes`)
        })    
    },               
    
}  