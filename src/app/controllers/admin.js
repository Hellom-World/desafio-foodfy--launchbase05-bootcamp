
const { age, date } = require('../../lib/utils')
const db = require('../../config/db')
const Admin = require('../models/Admin')
const Chefs = require('../models/Chefs')
const RecipeFiles = require('../models/RecipeFiles')

module.exports = {
    async index(req, res){

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
        
        

        
			files = files.map(file => ({
				...file,
				src:`${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
            }))

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
                        
            return res.render("sitepages/index.njk", {recipes})
    
        
        
    },
    showRecipes(req, res){
        Admin.findRecipes(req.params.id, function (recipe){
            if (!recipe) return res.send("recipe not found!")

            recipe.created_at = date(recipe.created_at).format
        
        return res.render('sitepages/showrecipe.njk', {recipe})  
        })
    }, 
    async showchef(req, res){

        let results = await Chefs.find(req.params.id)
        const chef = results.rows[0]
        if (!chef) return res.send("Chef no found!")

        
        results = await Chefs.findChefRecipes(req.params.id)
        const recipes = results.rows
        
        

        //get imagens
        results = await RecipeFiles.findFileForId(chef.file_id)
        let filechef = ""
        if (results.rows.length  != 0 ){
            filechef = results.rows[0]
            
            
            
            filechef.src = `${req.protocol}://${req.headers.host}${filechef.path.replace("public", "")}` 
            
        }
            
        if(recipes.length == 0) {
            return res.render("sitepages/showchef.njk", { chef, filechef, recipes })
        }
      
       
        
        if(recipes) {
            
        
        let RecipeFileId = recipes[0].id
      
    
        results = await RecipeFiles.findFileForIdRecipe(RecipeFileId)
        let fileRecipeId = results.rows[0].file_id

        
        results = await RecipeFiles.findFileForId(fileRecipeId)
        let filesRecipe = results.rows[0]
        filesRecipe.src = `${req.protocol}://${req.headers.host}${filesRecipe.path.replace("public", "")}` 
        
    
                
        
        return res.render("sitepages/showchef.njk", { chef, recipes, filechef, filesRecipe})
        }
    },  
    recipesPaginate(req, res){
        let {filter, page, limit } = req.query

        page = page || 1
        limit = limit || 3
        let offset = limit * (page - 1)

        const params = {
            filter,
            page,
            limit,
            offset,
            callback(recipes){

                const pagination = {
                    
                    total: Math.ceil(recipes[0].total / limit),
                    page
                }
                return res.render("sitepages/recipes.njk", { recipes, pagination, filter })
            }
        }

        Admin.paginate(params)

        
    },
    about(req, res){
        return res.render('sitepages/sobre.njk')        
    },
   async chefs(req, res){
        

        let result = await Admin.allChefs() 
        const chefs = result.rows

        result = await RecipeFiles.allFiles()
			const files = result.rows.map(file => ({
				...file,
				src:`${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
			}))

        return res.render('sitepages/chefs.njk', {chefs, files})
    },   
    
      

     

              

    
    
    
     
}  