const { age, date } = require('../../lib/utils')
const db = require('../../config/db')
const Chefs = require('../models/Chefs')
const File = require('../models/File')
const RecipeFiles = require('../models/RecipeFiles')


module.exports = {
   async index(req, res){
        let result = await Chefs.all() 
        const chefs = result.rows

        result = await RecipeFiles.allFiles()
			const files = result.rows.map(file => ({
				...file,
				src:`${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
            }))
            
            for (file in files){
                for(chef in chefs){
                    if(chefs[chef].file_id == files[file].id){
                        chefs[chef] = {
                            ...chefs[chef],
                            path: files[file].path,
                            src: files[file].src
                        }
                    }
                }
            }

        return res.render('admin/chefs/chefs.njk', {chefs, files})
    },
    create(req, res){
        return res.render('admin/chefs/create.njk')        
    }, 
   async post(req, res){
        const keys = Object.keys(req.body)

        for(key of keys) {
            if (req.body[key] == "") {
                return res.send('please, fill all fields')
            }
        }
        let resultsFile = await File.create(...req.files)
        const file_id = resultsFile.rows[0].id


        let resultsChef = await Chefs.create(req.body.name, file_id)
        chef = resultsChef.rows[0]  
       
            return res.redirect(`/admin/chefs/${chef.id}`)
       
    }, 
    async put(req, res){
        const keys = Object.keys(req.body)

        for(key of keys) {
            if (req.body[key] == "") {
                return res.send("Please, fill all fields!")
            }
        }

        let resultsFile = await File.create(...req.files)
        const file_id = resultsFile.rows[0].id


        console.log(req.body)
        Chefs.update(req.body, function() {
            return res.redirect(`/admin/chefs/${req.body.id}`)
        })
    },   
    async show(req, res){

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
            return res.render("admin/chefs/show.njk", { chef, filechef, recipes })
        }
      
       
        
        if(recipes) {
            
        
        let RecipeFileId = recipes[0].id
      
    
        results = await RecipeFiles.findFileForIdRecipe(RecipeFileId)
        let fileRecipeId = results.rows[0].file_id

        
        results = await RecipeFiles.findFileForId(fileRecipeId)
        let filesRecipe = results.rows[0]
        filesRecipe.src = `${req.protocol}://${req.headers.host}${filesRecipe.path.replace("public", "")}` 
        
    
        
        
        return res.render("admin/chefs/show.njk", { chef, recipes, filechef, filesRecipe}),console.log(filesRecipe)
        }
    }, 
    async edit(req, res){
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
            return res.render("admin/chefs/edit.njk", { chef, filechef, recipes })
        }
      
       
        
        if(recipes) {
            
        
        let RecipeFileId = recipes[0].id
      
    
        results = await RecipeFiles.findFileForIdRecipe(RecipeFileId)
        let fileRecipeId = results.rows[0].file_id

        
        results = await RecipeFiles.findFileForId(fileRecipeId)
        let filesRecipe = results.rows[0]
        filesRecipe.src = `${req.protocol}://${req.headers.host}${filesRecipe.path.replace("public", "")}` 
        
    
                
        
        return res.render("admin/chefs/edit.njk", { chef, recipes, filechef, filesRecipe})
        }
    },
    delete(req, res){
        
        Chefs.delete(req.body.id, function(){
            return res.redirect(`/admin/chefs`)
        })    
    } 
}