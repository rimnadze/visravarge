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

var functions = {
    list:function(req, res){
        
    },
    set:function(req, res){
        if(req.method !== 'POST') { error(res, 'wrong-method'); return }
        readPostPars(function(err, pars){
            if(err) { error(res, 'post-read-error', err); return }
            
            todoColl.insert()
        })
    },
    signup:function(req, res){
        
    },
    login:function(req, res){
        
    },
    logout:function(req, res){
        
    },
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
        if(err) { cb(err); return }
        postquery = querystring.parse(decodeURIComponent(buffer.toString()))
        
        cb(null, postquery)
    })
}

function badrequest(res, message){
    console.trace(message)
    res.statusCode = 400
    res.end(message)
}
function error(res, message, err){
    console.trace(err)
    res.statusCode = 500
    res.end(message)
}
