var url = require('url'),
        querystring = require('querystring')
        mongoClient = require('mongodb').MongoClient,
        db,
        userColl,
        todoColl
        
module.exports = function(mongoUrl, cb){
    mongoClient.connect(mongoUrl, function(err, inDb){
        if(err) { cb(err); return }
        
        db=inDb
        userColl = db.collection('user')
        todoColl = db.collection('todo')
        
        cb()
    })
}
        

exports.respond = function(req, res){
    var urlpars = url.pars(req.url, true)
    
    var operation = urlpars.pathname.substring(1)
    if(!(operation in functions)) return false
    
    functions[operation](req, res)
}

function readPost(req, cb){
    var buffer=new Buffer(0)
    req.on('data', function(chunk){
        Buffer.concat([buffer, chunk])
    })
    req.once('end', function(){
        cb(null, buffer)
    })
    req.once('error', cb)
}

function readPostPars(req, cb){
    readPost(function(err, buffer){
        postquery = querystring.parse(decodeURIComponent(buffer.toString()))
        
    })
}

var functions = {
    list:function(req, res){
        
    },
    add:function(req, res){
        readPostPars(function(err, pars){
            
        })
    },
    change:function(req, res){
        
    },
    signup:function(req, res){
        
    },
    login:function(req, res){
        
    },
    logout:function(req, res){
        
    },
}
