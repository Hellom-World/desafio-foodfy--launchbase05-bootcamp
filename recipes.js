const recData = require("./data.json")

exports.index = function(req, res){
    return res.render('admin/index.njk', {recipes: recData.recipes})
}
exports.create = function(req, res){
    return res.render('admin/create.njk')
}
exports.post = function(req, res){ 

    const keys = Object.keys(req.body)
    console.log(keys)
    
    for(key of keys) {
        if (req.body[key] == ""){
            return res.send('Please, fill all fields!')
        }
    }

    let index = 1
	const lastRecipe = recData.recipes[recData.recipes.length - 1]
 				
		if(lastRecipe) {
			index = lastRecipe.index + 1
		}


        recData.recipess.push({
            index,
            ...req.body
        })

    fs.writeFile("data.json", JSON.stringify(recData, null, 2), function(err){
        if (err) return res.send("Write file error!")
    })
    
    
    return res.redirect("./admin/recipes")
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
    
    
    const { id } = req.body
    let index = 0

    const foundRecipe = recData.recipes.find(function(recipe, foundIndex){
        if (id == recipe.index) {
            index = foundIndex
            return true
        }
    })

    if (!foundRecipe) return res.send("Recipe Not Found")

    const recipe = {
        ...foundRecipes,
        ...req.body,
        id: Number(req.body.id)
    }

    data.recipes[index] = recipe

    fs.writeFile("data.json", JSON.stringify(recData, null, 2), function (err) {
        if(err) return res.send("write error!")

        return res.redirect(`admin/recipes/${id}`)
    })
}
exports.delete = function(req, res){
    const { id } = req.body

    const filteredEstudantees = data.estudantes.filter(function(estudante){
        return estudante.id != id
    })

    data.estudantes = filteredEstudantees

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) return res.send("Write file error!")

        return res.redirect("/")
    })
}