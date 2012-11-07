
var mongo = require('../libs/mongo.js'),
    clientDbName = '_client';
    
exports.create = function(clientId, clientName) {
    return { 
        id: "",
        name: "",
        check: "",
        clientId: clientId,
        clientName: clientName             
    };
};

exports.get = function (id, callback) {
    if(typeof id === 'undefined')
        throw 'id cannot be undefined';
    throw 'not implimented';
};

exports.list = function (clientName, callback) {
    if(typeof clientName === 'undefined')
        throw 'clientName cannot be undefined';
        
    mongo.all(clientName + clientDbName, function (results) {
        callback(results);    
    });
};

exports.save = function (check, callback) {
    if(typeof check === 'undefined')
        throw 'check cannot be undefined';
        
    if(typeof check.name === 'undefined')
        throw 'check.name cannot be undefined';
        
    if(typeof check.clientName === 'undefined')
        throw 'check.clientName cannot be undefined';
        
    if(typeof check.id === 'undefined') {
        throw 'check.id cannot be undefined use the create method';
    }
        
    if(check.id === '') {
        mongo.insert (check.clientName + clientDbName, check, function(mongoResult) {
            if(typeof mongoResult === "undefined")
                callback({message: "result from mongo was null"});
            else 
            {
                var responseCheck = mongoResult[0];
                responseCheck.id = mongoResult[0]._id;
                callback(responseCheck);     
            }
                
        });
    }
    else {
        mongo.update (check.clientName + clientDbName, check, check.id, function(mongoResult) {
            if(typeof mongoResult === "undefined")
                callback({message: "result from mongo was null"});
            else 
                callback(check);
        });
    }
};

exports.delete = function (id) {
    if(typeof id === 'undefined')
        throw 'id cannot be undefined';
        
    throw 'not implimented';
};