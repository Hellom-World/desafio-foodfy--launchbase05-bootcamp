const express = require ('express')
const routes = express.Router()
const recipes = require('./recipes')
const uxs = require('./uxs')

const recData = require("./data.json")


routes.get("/", uxs.index)
routes.get("/receitas", uxs.receitas)
routes.get("/sobre", function(req, res){
    return res.render("ux/sobre.njk")
})

routes.get("/recipes/:index", function (req, res) {
    const recipes = recData.recipes  // Array de receitas carregadas do data.js
    const recipeIndex = req.params.index;

    return res.render("ux/receita.njk", {item: recipes[recipeIndex]}) 
    
  })


routes.get("/admin/recipes", recipes.index); // Mostrar a lista de receitas
routes.get("/admin/recipes/create", recipes.create); // Mostrar formulário de nova receita
routes.get("/admin/recipes/:id", recipes.show); // Exibir detalhes de uma receita
routes.get("/admin/recipes/:id/edit.njk", recipes.edit); // Mostrar formulário de edição de receita
routes.post("/admin/recipes", recipes.post); // Cadastrar nova receita
routes.put("/admin/recipes", recipes.put); // Editar uma receita
routes.delete("/admin/recipes", recipes.delete); // Deletar uma receita */



module.exports = routes