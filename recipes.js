const recData = require("./data.json")

exports.index = function(req, res){
    return res.render('admin/index.njk', {recipes: recData.recipes})
}

exports.show = function(req, res){
    const { id } = req.params 

    const foundRecipes = recData.recipes.find(function(recipe){
        return id == recipe.index										
    })

    if (!foundRecipes) return res.send("recipe not found!")
    
    

    const recipe = {
        ...foundRecipes
    }
     

    return res.render("admin/show.njk", {recipe})


}

exports.edit = function(req, res){
    const { id } = req.params 

    const foundRecipes = recData.recipes.find(function(recipe){
        return id == recipe.index										
    })

    if (!foundRecipes) return res.send("recipe not found!")
    
    

    const recipe = {
        ...foundRecipes  
    }
    return res.render('admin/edit.njk', {recipe})
}