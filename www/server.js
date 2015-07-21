var http=require('http'),
        StaticHoster = new require('./lib/static-hoster.js'),
        staticHoster = new StaticHoster('./static'),
        operations = require('./operations.js')

http.createServer(function(req, res){
    staticHoster.respond(req, res) || operations.respond(req, res)
}).listen(8080)
