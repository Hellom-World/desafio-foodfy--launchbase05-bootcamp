const recData = require("./data")

exports.index = function(req, res){
    return res.render('admin/index.njk', {itens: recData})
}

exports.show = function(req, res){
    const { id } = req.params 

    const foundRecipes = recData.find(function(recipe){
        return id == recipe.index										
    })

    if (!foundRecipes) return res.send("recipe not found!")
    
    

    const recipe = {
        ...foundRecipes
    }
     

    return res.render("admin/receita.njk", {recipe})


}			