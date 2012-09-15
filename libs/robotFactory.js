var robotFactory = (function () {
    var robotCls = {
        factory: {}    
    };
    
    robotCls.check = function (i, callback) {
        var testRun = require('../libs/testRun.js');
        testRun.test(i, callback);
        callback('help');
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
