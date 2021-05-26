
const { age, date } = require('../../lib/utils')
const db = require('../../config/db')
const Admin = require('../models/Admin')

module.exports = {
    index(req, res){
        Admin.allRecipes(function(recipes) {
            
            return res.render("admin/index.njk", {recipes})
    
        })
        
    },   
    create(req, res){
        return res.render('admin/create.njk')        
    },
    createchef(req, res){
        return res.render('admin/createchef.njk')        
    },   
    post(req, res){
        const keys = Object.keys(req.body)

        for(key of keys) {
            if (req.body[key] == "") {
                return res.send('please, fill all fields')
            }
        }

        Admin.create(req.body, function(recipes) {
            return res.redirect(`/admin/recipes/${recipes.id}`)
        })
    },   
    show(req, res){
        Admin.find(req.params.id, function (recipe){
            if (!recipe) return res.send("Instructor no found!")

            recipe.created_at = date(recipe.created_at).format

            return res.render("admin/show.njk", { recipe })
        
        })
    },  
    chefs(req, res){
        Admin.all(function(chefs) {
        
        return res.render('admin/chefs.njk', {chefs})
        })
    },              
    edit(req, res){
        Admin.find(req.params.id, function (recipe){
            if (!recipe) return res.send("recipe no found!")

            return res.render(`admin/edit.njk`, { recipe })
        })
       
    },
    editchef(req, res){
        Admin.findchef(req.params.id, function (chef){
            if (!chef) return res.send("Chef no found!")

            return res.render(`admin/editchef.njk`, { chef })
        })
       
    },   
    put(req, res){
        const keys = Object.keys(req.body)
        for (key of keys) {
            if (req.body[key] == "") {
                return res.send(`Preencha todos os campos`)
            }
        }
            return 
    },   
    delete(req, res){
        
        return 
            
    }   
}  