var playground = (function () {
    // constructor
    var cls = function () {};
    
    // private 
    var vm = require('vm');      
    var baseContext = {
        setTimeout: setTimeout,
        request: require('request'),
        robot: require('../libs/robot.js')
    };
    
    cls.exec = function (code, callback) {
        
        var initSandbox = baseContext;            
        initSandbox.done = function(result) {
            callback(result);
        };
            
        var context = vm.createContext(initSandbox);
        // cloud9 uses runInThisContext
        try {
            vm.runInContext(code, context); 
            setTimeout(function() {
                callback('30 second timeout, make sure to fire done() method.\n'); 
            }, 30000); // 30 second timeout for the script to execute.
        }
        catch(exception) {
            console.error("There was an error running the script ", exception);
            // full stack
            // callback('Fail: ' + exception + '\n\n:::' + Error().stack);
            callback('Fail: ' + exception);
        }
    };
    
    return cls;
})();

exports.exec = playground.exec;
