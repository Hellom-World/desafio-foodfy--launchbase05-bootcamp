
const { age, date } = require('../../lib/utils')
const db = require('../../config/db')
const Admin = require('../models/Admin')

module.exports = {
    index(req, res){
        Admin.allRecipes(function(recipes) {
            
            return res.render("sitepages/index.njk", {recipes})
    
        })
        
    },
    showRecipes(req, res){
        Admin.findRecipes(req.params.id, function (recipe){
            if (!recipe) return res.send("recipe not found!")

            recipe.created_at = date(recipe.created_at).format
        
        return res.render('sitepages/showrecipe.njk', {recipe})  
        })
    }, 
    showchef(req, res){
        Admin.findchef(req.params.id, function (chef){
            if (!chef) return res.send("Chef no found!")

            chef.created_at = date(chef.created_at).format
            
            Admin.findChefRecipes(req.params.id, function(recipes){

                return res.render('sitepages/showchef.njk', {  chef, recipes })
        
            })
        })
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
    chefs(req, res){
        Admin.allChefs(function(chefs) {
        
        return res.render('sitepages/chefs.njk', {chefs})
        })
    },   
    
      

     

              

    
    
    
     
}  