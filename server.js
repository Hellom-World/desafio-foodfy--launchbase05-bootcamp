const express = require('express')
const nunjucks = require('nunjucks')
const routes = require('./routes')
const MethodOverride = require('method-override')
const server = express()

server.use(express.urlencoded({extended: true}))
server.use(express.static('public'))
server.use(routes)
server.use(MethodOverride('_method'))

server.set("views engine, njk")

nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true
})

server.listen(4000, function(){
    console.log("server is running")
    
})
