const recData = require('./data')

exports.index = function(req, res){
    return res.render('ux/index.njk', {recipes: recData.recipes})
} 
exports.receitas = function(req, res){
    return res.render("ux/receitas.njk", {recipes: recData.recipes})
}