// Helper class used to encapsulate calls to mongo.
var mongoUtil = (function () {
    // Constructor
    var mongoCls = function() { };
    
    mongoCls.mongoskin = require('mongoskin');
    mongoCls.connection = 'robot:dog.bone@alex.mongohq.com:10070/siterobot';
        
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