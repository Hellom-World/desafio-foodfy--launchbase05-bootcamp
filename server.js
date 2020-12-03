const express = require('express')
const nunjucks = require('nunjucks')
const routes = require('./routes')

const server = express()
const recData = require("./data")

server.use(express.static('public'))
server.use(routes)

server.set("views engine, njk")

nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true
})

server.listen(4000, function(){
    console.log("server is running")
})