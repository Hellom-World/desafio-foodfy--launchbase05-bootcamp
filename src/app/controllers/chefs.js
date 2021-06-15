const { age, date } = require('../../lib/utils')
const db = require('../../config/db')
const Chefs = require('../models/Chefs')
const File = require('../models/File')


module.exports = {
    index(req, res){
        Chefs.all(function(chefs) {
        
        return res.render('admin/chefs/chefs.njk', {chefs})
        })
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
    put(req, res){
        const keys = Object.keys(req.body)

        for(key of keys) {
            if (req.body[key] == "") {
                return res.send("Please, fill all fields!")
            }
        }
        Chefs.update(req.body, function() {
            return res.redirect(`/admin/chefs/${req.body.id}`)
        })
    },   
    show(req, res){
        Chefs.find(req.params.id, function (chef){
            if (!chef) return res.send("Chef no found!")

            chef.created_at = date(chef.created_at).format
            
            Chefs.findChefRecipes(req.params.id, function(recipes){

                return res.render('admin/chefs/show.njk', {  chef, recipes })
        
            })
        })
    }, 
    edit(req, res){
        Chefs.find(req.params.id, function (chef){
            if (!chef) return res.send("Chef no found!")

            return res.render(`admin/chefs/edit.njk`, { chef })
        })
       
    },
    delete(req, res){
        
        Chefs.delete(req.body.id, function(){
            return res.redirect(`/admin/chefs`)
        })    
    } 
}