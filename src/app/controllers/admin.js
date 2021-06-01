
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
    postchef(req, res){
        const keys = Object.keys(req.body)

        for(key of keys) {
            if (req.body[key] == "") {
                return res.send('please, fill all fields')
            }
        }

        Admin.createchef(req.body, function(chefs) {
            return res.redirect(`/admin/chefs/${chefs.id}`)
        })
    },   
    show(req, res){
        Admin.find(req.params.id, function (recipe){
            if (!recipe) return res.send("Instructor no found!")

            recipe.created_at = date(recipe.created_at).format

            return res.render("admin/show.njk", { recipe })
        
        })
    },
    showchef(req, res){
        Admin.findchef(req.params.id, function (chef){
            if (!chef) return res.send("Chef no found!")

            /* chef.created_at = date(chef.created_at).format */
            
            Admin.findChefRecipes(req.params.id, function(recipes){

                return res.render('admin/showchef.njk', {  chef, recipes }),console.log(recipes)
        
            })
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

        for(key of keys) {
            if (req.body[key] == "") {
                return res.send("Please, fill all fields!")
            }
        }
        
            Admin.update(req.body, function() {
                return res.redirect(`/admin/recipes/${req.body.id}`)
            })
        
    },
    putchef(req, res){
        const keys = Object.keys(req.body)

        for(key of keys) {
            if (req.body[key] == "") {
                return res.send("Please, fill all fields!")
            }
        }
        Admin.updatechef(req.body, function() {
            return res.redirect(`/admin/chefs/${req.body.id}`)
        })
    },   
    delete(req, res){
        
        Admin.delete(req.body.id, function(){
            return res.redirect(`/admin/recipes`)
        })    
    },
    deletechef(req, res){
        
        Admin.deletechef(req.body.id, function(){
            return res.redirect(`/admin/chefs`)
        })    
    }   
}  