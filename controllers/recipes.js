const recData = require("../data.json")
const fs= require('fs')
const {noEmpty} = require("../utils")


exports.index = function(req, res){
    return res.render('admin/index.njk', {recipes: recData.recipes})
}
exports.create = function(req, res){
    return res.render('admin/create.njk')
}
exports.post = function(req, res) {
    const keys = Object.keys(req.body)
    for (key of keys) {
        if (req.body[key] == "") {
            return res.send(`Preencha todos os campos`)
        }
    }
    let {title, image, preparation, ingredients, information, author} = req.body
    let  index = 1
	const lastRecipe = recData.recipes[recData.recipes.length - 1]
    
    if(lastRecipe) {
        index = Number(lastRecipe.index) + 1
    }
    
    recData.recipes.push({
        index,
        image,
        title,
        author,
        ingredients: ingredients.filter(noEmpty),
        preparation: preparation.filter(noEmpty),
        information
    })
    fs.writeFile("data.json", JSON.stringify(recData, null, 2), function(err) {
        if (err) return res.send('Write file err')
    })
    return res.redirect("/admin/recipes")
    /* return res.send(ingredients) */
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
exports.put = function(req, res) {  

    const keys = Object.keys(req.body)
    for (key of keys) {
        if (req.body[key] == "") {
            return res.send(`Preencha todos os campos`)
        }
    }
    const { id } = req.body
    let idx = 0

    let {ingredients, preparation} = req.body


    const foundRecipe = recData.recipes.find(function(recipe, foundIndex){
        if (id == recipe.index) {
            idx = foundIndex
            return true
        }
    })

    if (!foundRecipe) return res.send("Recipe Not Found")

    const recipe = {
        ...foundRecipe,
        ...req.body,
        ingredients: ingredients.filter(noEmpty),
        preparation: preparation.filter(noEmpty),
        index: Number(req.body.id)        
    }

    recData.recipes[idx] = recipe

    fs.writeFile("data.json", JSON.stringify(recData, null, 2), function (err) {
        if(err) return res.send("write error!")

        return res.redirect(`recipes`)
    })
}
exports.delete = function(req, res){
    const { id } = req.body

    const filteredRecipes = recData.recipes.filter(function(recipe){
        return recipe.index != id
    })

    recData.recipes = filteredRecipes

    fs.writeFile("data.json", JSON.stringify(recData, null, 2), function(err) {
        if (err) return res.send("Write file error!")

        return res.redirect("recipes")
    })
}