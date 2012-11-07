// Helper class used to encapsulate calls to mongo.
var mongoUtil = (function () {
    // Constructor
    var mongoCls = function() { };
    
    mongoCls.mongoskin = require('mongoskin');
    mongoCls.connection = 'robot:dog.bone@alex.mongohq.com:10070/siterobot';
    // mongoCls.ObjectId =  require('../node_modules/mongodb/lib/mongodb/bson/bson').ObjectID;
        
    return mongoCls;
})();

// read items from the mongo server and return the result. 
exports.read = function (collectionName, query, callback) {
    throw 'not implimented';
};

// load items into mongo
exports.insert = function (collectionName, source, callback) {    
    var conn = mongoUtil.mongoskin.db(mongoUtil.connection);
    conn.collection(collectionName).insert(source, function(err, result) {
        // todo: handle error    
        conn.close();
        if(err === null)
            callback(result);
        else
            callback(err);
    });
};

exports.update = function (collectionName, source, id, callback) {    
    var conn = mongoUtil.mongoskin.db(mongoUtil.connection);
    source._id = conn.ObjectID(id);

    var saveOptions = { upsert: false, multi: false, safe: false };
    conn.collection(collectionName).save(source, saveOptions, function(err, result) {
        // todo: handle error    
        conn.close();
        if(err === null)
            callback(source);
        else
            callback(err);
    });
};

/* load items into mongo
exports.update = function (collectionName, source, id, callback) {    
    var conn = mongoUtil.mongoskin.db(mongoUtil.connection);
    // store.collection('sessions').updateById(session._id.toString(), {$set: status_obj} ); 
    // req.body.user._id= ObjectId(req.params.id);
    conn.collection(collectionName).insert(source, function(err, result) {
        // todo: handle error    
        conn.close();
        if(err === null)
            callback(result);
        else
            callback(err);
    });
};
*/