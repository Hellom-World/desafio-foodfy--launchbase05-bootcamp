const express = require ('express')
const routes = express.Router()
const recipes = require('.app/controllers/recipes')
const public = require('.app/controllers/public')

const recData = require("./data.json")


routes.get("/", public.index)
routes.get("/receitas", public.receitas)
routes.get("/sobre", public.about)
routes.get("/recipes/:index", public.show)


routes.get("/admin", recipes.index); // Mostrar a lista de receitas
routes.get("/admin/recipes", recipes.index); // Mostrar a lista de receitas
routes.get("/admin/recipes/create", recipes.create); // Mostrar formulário de nova receita
routes.get("/admin/recipes/:id", recipes.show); // Exibir detalhes de uma receita
routes.get("/admin/recipes/:id/edit.njk", recipes.edit); // Mostrar formulário de edição de receita
routes.post("/admin/recipes", recipes.post); // Cadastrar nova receita
routes.put("/admin/recipes", recipes.put); // Editar uma receita
routes.delete("/admin/recipes", recipes.delete); // Deletar uma receita */


module.exports = routes