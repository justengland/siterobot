// Helper class used to encapsulate calls to mongo.
var mongoUtil = (function () {
    // Constructor
    var mongoCls = function() { };
    
    mongoCls.mongoskin = require('mongoskin');
    mongoCls.connection = 'alex.mongohq.com:10070/siterobot';
        
    return mongoCls;
})();

// read items from the mongo server and return the result. 
exports.findOne = function (collectionName, query, callback) {
    var conn = mongoUtil.mongoskin.db(mongoUtil.connection);
    conn.collection(collectionName).findOne(query, function(err, result) {
        conn.close();
        if (err) throw err;
        
        callback(result);
    });
};

// load items into mongo
exports.insert = function (collectionName, source, callback) {    
    var conn = mongoUtil.mongoskin.db(mongoUtil.connection);
    conn.collection(collectionName).insert(source, function(err, result) {
        conn.close();
        if (err) throw err;
        
        callback(result);
    });
};

exports.all = function (collectionName, callback) {  
    var conn = mongoUtil.mongoskin.db(mongoUtil.connection);
    conn.collection(collectionName).find().toArray(function(err, result) {
        conn.close();
        if (err) throw err;
        
        callback(result);
    });
};

exports.update = function (collectionName, source, id, callback) {    
    var conn = mongoUtil.mongoskin.db(mongoUtil.connection);
    source._id = conn.ObjectID(id);

    var saveOptions = { upsert: false, multi: false, safe: false };
    conn.collection(collectionName).save(source, saveOptions, function(err, result) {
        conn.close();
        if (err) throw err;
        
        // todo: should I return result or source?
        callback(source);
    });
};