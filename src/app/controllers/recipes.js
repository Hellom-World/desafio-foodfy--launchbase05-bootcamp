const { age, date } = require('../../lib/utils')
const db = require('../../config/db')
const Recipes = require ('../models/Recipes')

module.exports = {
    index(req, res){
        Recipes.all(function(recipes) {
            
            return res.render("admin/index.njk", {recipes})
    
        })
    },
    create(req, res){
        Recipes.chefSelectOptions(function(options){
            return res.render('admin/create.njk', {chefOptions: options})
        })
    },      
    post(req, res){
        const keys = Object.keys(req.body)

        for(key of keys) {
            if (req.body[key] == "") {
                return res.send('please, fill all fields')
            }
        }
        
            Recipes.create(req.body, function(recipes) {
                return res.redirect(`/admin/recipes/${recipes.id}`)
            })
    },
    show(req, res){
        Recipes.find(req.params.id, function (recipe){
            if (!recipe) return res.send("recipe not found!")

            recipe.created_at = date(recipe.created_at).format
        
        return res.render('admin/show.njk', {recipe})  
        })
    },                
    edit(req, res){
        Recipes.find(req.params.id, function (recipe){
            if (!recipe) return res.send("recipe no found!")

            Recipes.chefSelectOptions(function(options){
                return res.render(`admin/edit.njk`, {recipe, chefOptions: options})
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