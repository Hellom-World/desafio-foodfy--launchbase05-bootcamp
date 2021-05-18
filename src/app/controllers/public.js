const { age, date } = require('../../lib/utils')
const db = require('../../config/db')
const Public = require ('../models/Public')

module.exports = {
    index(req, res){
        Public.all(function(recipes) {
            return res.render("public/index", {recipes})
    
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
        
        return

    
    },                
    edit(req, res){
        
        return         
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