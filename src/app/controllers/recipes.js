const { age, date } = require('../../lib/utils')
const db = require('../../config/db')
const Recipes = require ('../models/Recipes')

module.exports = {
    index(req, res){
        Recipes.all(function(recipes) {
            
            return res.render("recipes/index.njk", {recipes})
    
        })
    },
    create(req, res){
        return res.render('admin/create.njk')        
    },    
    post(req, res){
        const keys = Object.keys(req.body)
        for (key of keys) {
            if (req.body[key] == "") {
                return res.send(`Preencha todos os campos`)
            }
        }
        
        return 
        
    },   
    show(req, res){
        Recipes.find(req.params.index, function (recipe){
            if (!recipe) return res.send("recipe not found!")

            recipe.created_at = date(recipe.created_at).format
        
        return res.render('recipes/show.njk', {recipe})  
        })
    },
    showchef(req, res){
        Recipes.findchef(req.params.index, function (chef){
            if (!chef) return res.send("Chef no found!")

            chef.created_at = date(chef.created_at).format
            
            Recipes.findChefRecipes(req.params.index, function(recipes){

                return res.render('recipes/showchef.njk', {  chef, recipes })
        
            })
        })
    },                
    edit(req, res){
        
        Recipes.find(req.params.id, function (recipe){
            if (!recipe) return res.send("recipe no found!")

            return res.render(`admin/recipes/${recipe.id}/edit.njk`, { recipe })
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
                return res.redirect(`/admin/recipes/${req.body.id}/edit.njk`)
            })
    },   
    delete(req, res){
        
        return 
            
    },
    
    about(req, res){
        return res.render('recipes/sobre.njk')        
    },
    chefs(req, res){
        Recipes.allChefs(function(chefs) {
        
        return res.render('recipes/chefs.njk', {chefs})
        })
    },              
    recipes(req, res){
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
                return res.render("recipes/recipes.njk", { recipes, pagination, filter })
            }
        }

        Recipes.paginate(params)

        /* let {filter, page, limit } = req.query

        page = page || 1
        limit = limit || 3
        let offset =  limit * (page - 1)

        const params = {
            filter,
            page,
            limit,
            offset,
            callback(recipes){
                return res.render("recipes/recipes.njk", { recipes, filter })
            }
        }

        Recipes.paginate(params) */

    },
}  