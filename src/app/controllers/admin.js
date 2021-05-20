
const { age, date } = require('../../lib/utils')
const db = require('../../config/db')
const Admin = require('../models/Admin')

module.exports = {
    index(req, res){
        Admin.all(function(recipes) {
            
            return res.render("admin/index.njk", {recipes})
    
        })
        
    },   
    create(req, res){
        return res.render('admin/create.njk')        
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
    edit(req, res){
        Admin.find(req.params.id, function (recipe){
            if (!recipe) return res.send("recipe no found!")

            return res.render(`admin/recipes/${recipe.id}/edit.njk`, { recipe })
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