const recData = require('../data.json')
const {noEmpty} = require("../utils")

exports.index = function(req, res){
    return res.render('public/index.njk', {recipes: recData.recipes})
} 
exports.receitas = function(req, res){

    return res.render("public/receitas.njk", {recipes: recData.recipes})
}
exports.about = function(req, res){
    return res.render("public/sobre.njk")
}
exports.show = function (req, res) {
    let recipes = recData.recipes;
    const recipeIndex = req.params.index;
      
    recipe = {
        ...recData.recipes[recipeIndex],
        ingredients: recipes[recipeIndex].ingredients.filter(noEmpty),
        preparation: recipes[recipeIndex].preparation.filter(noEmpty),
    }
    return res.render("public/receita.njk", {item: recipe}) 
    
  }