var robotFactory = (function () {
    var robotCls = {
        factory: {
            check: function() { throw 'not implimented'; },
            async: '', // asnyc js implimenation
            insert: function() { throw 'not implimented'; },
            runTests: function() { throw 'not implimented'; }
        }    
    };
    
    robotCls.check = function (i, callback) {
        // var testRun = require('../libs/testRun.js');
        robotCls.factory.runTests(i, callback);         
    };
    
    robotCls.save = function (i, callback) {
        // var testRun = require('../libs/testRun.js');
        robotCls.factory.insert("iSaver", i, callback);
    };
    
    return robotCls;
})();

module.exports = function(factory) {
    if(typeof factory === 'undefined') 
        throw 'robot factory cannot be null.';
        
    robotFactory.factory = factory;
    return robotFactory;
};

exports.factory = robotFactory.factory;
exports.check = robotFactory.check;
exports.save = robotFactory.save;
