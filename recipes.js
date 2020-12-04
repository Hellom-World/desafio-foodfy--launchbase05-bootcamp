const recData = require("./data")

exports.index = function(req, res){
    return res.render('admin/index.njk', {itens: recData})
}