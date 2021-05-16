
const { age, date } = require('../../lib/utils')

module.exports = {
    index(req, res){
        return res.render('admin/index.njk')
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
        let {title, image, preparation, ingredients, information, author} = req.body
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