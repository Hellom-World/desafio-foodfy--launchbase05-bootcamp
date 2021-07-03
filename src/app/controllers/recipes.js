const { age, date } = require('../../lib/utils')
const db = require('../../config/db')
const Recipes = require ('../models/Recipes')
const File = require('../models/File')
const RecipeFiles = require('../models/RecipeFiles')

module.exports = {
    async index(req, res){
        /* let results = await RecipeFiles.allRecipesWithFileIdAndNameChef() */

        let results = await RecipeFiles.allRecipes()
        let recipes = results.rows
        
         results = await RecipeFiles.allRecipeFiles()
        let FilesRecipes = results.rows
        
        results = await RecipeFiles.allFiles()
        let allfiles = results.rows 
        let files = ""
        for (allfile in allfiles){
            
            for (FileRecipe in FilesRecipes){
                if(allfiles[allfile].id == FilesRecipes[FileRecipe].file_id  ){

                    files =[...files,{
                        ...allfiles[allfile]
                    }]
                    
                }
            }
        }
        
        

        if(files) {

			files = files.map(file => ({
				...file,
				src:`${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
            }))
        }

        result = await RecipeFiles.findFileForId()
     
            for (recipe in recipes){
                for (file in files) {

                    if(recipes[recipe].id == files[file].recipe_id){
                        
                        recipes[recipe] = {
                            ...recipes[recipe],
                            path: files[file].path,
                            src: files[file].src
                        }
                        
                    }
                }
                
            }
            
            
           
      
      
      

      return res.render("admin/recipes/index.njk", {recipes})
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
    
    
    
    let resultsRecipes = await Recipes.create(req.body)
    const recipe_id = resultsRecipes.rows[0].id

    const filesPromise = req.files.map(file => File.create({...file, recipe_id}))
	await Promise.all(filesPromise)
    
        return res.redirect(`/admin/recipes/${recipe_id}/edit`)
    
},
    async show(req, res){
        let results = await Recipes.find(req.params.id)
        let recipe = results.rows[0]
        if (!recipe){
            return res.send("recipe not found!")
        } 
        recipe.created_at = date(recipe.created_at).format
                
        
        return res.render('admin/recipes/show.njk', {recipe})  
        
    },                
    async edit(req, res){
        let results = await Recipes.find(req.params.id)
        const recipe = results.rows[0]
        if (!recipe){
            return res.send("recipe no found!")
        } 

        
        results = await Recipes.chefSelectOptions()
        const options = results.rows
                
         
        results = await RecipeFiles.allFiles()
        const filesWithRecipeId = results.rows
        let filesRecipe = ""
        for(file in filesWithRecipeId){
            if (filesWithRecipeId[file].recipe_id == req.params.id){
                filesRecipe =[
                    ...filesRecipe,
                    

                        filesWithRecipeId[file]
                    
                ]
                    
                    

            }
        } 

        console.log(filesRecipe)

        //get imagens
		filesRecipe = filesRecipe.map(file => ({
			...file,
			src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
		})) 
        

        return res.render(`admin/recipes/edit.njk`, {recipe, chefOptions: options, filesRecipe})
            
        
       
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