var nodeFactory = (function () {
    var mongo = require('../libs/mongo.js');
    var async = require("async");
    var nodeCls = {
        async: async
    };    
    
    nodeCls.check = function (i) {
        return 'cool';
    };
    
    nodeCls.insert = function (collectionName, source, callback) { 
        return mongo.insert(collectionName, source, callback);
    };
    
    return nodeCls;
})();

exports.check = nodeFactory.check;
exports.async = nodeFactory.async;
exports.insert = nodeFactory.insert;