var nodeFactory = (function () {
    var mongo = require('../libs/mongo.js');
    var async = require("async");
    var nodeCls = {
        async: async
    };    
    
    nodeCls.check = function (i) {
        return 'cool';;
    };
    
    nodeCls.insert = function (collectionName, source, callback) { 
        return mongo.insert(collectionName, source, callback);
    };
    
    nodeCls.runTests = function (i, callback) { 
        
//        var result = { tests: [] };
//        for (var j = 0; j < i.tests.length; j++) {
//            result.tests.push({ 
//                url: i.tests[j].url,
//                // checks: i.tests[j].checks 
//                });    
//        }
        
        mongo.insert ("ironWork", i, function(mongoResult) {
            var result = mongoResult;
            try {
                result =  mongoResult[0]._id;
            }
            catch(e) { }
                
            callback ({ result: result });
        });
    };
    
    return nodeCls;
})();

exports.check = nodeFactory.check;
exports.async = nodeFactory.async;
exports.insert = nodeFactory.insert;
exports.runTests = nodeFactory.runTests;