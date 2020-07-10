const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const recData = require("./data")

server.use(express.static('public'))

server.set("views engine, njk")

nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true
})

server.get("/", function(req, res){
    return res.render("index.njk", {itens: recData})
})

server.get("/receitas", function(req, res){
    return res.render("receitas.njk", {itens: recData})
})

server.get("/sobre", function(req, res){
    return res.render("sobre.njk")
})

server.get("/recipes/:index", function (req, res) {
    const recipes = recData  // Array de receitas carregadas do data.js
    const recipeIndex = req.params.index;

    return res.render("receita.njk", {item: recipes[recipeIndex]}) 
    
  })

server.listen(4000, function(){
    console.log("server is running")
})