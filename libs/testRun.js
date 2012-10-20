exports.load = function () {

    // Constructor
    var testRunCls = { 
        startTime: Date.now(),
        robotCount: 0,
        robots: [],   
        pass: false
    };
    
    // Use the i protocall to create robot tests
    testRunCls.test = function (i, callback) {       
        
        // This is the wrapping call to log the request.
        var finish = function (finishResult) {
            var mongo = require('../libs/mongo.js');
            testRunCls.endTime = Date.now();
            testRunCls.elaspedTime = testRunCls.endTime - testRunCls.startTime;
            // testRunCls.finish = finishResult;
            testRunCls.robotCount = testRunCls.robots.length;
            mongo.insert('testResults', testRunCls, function(obj) { 
                callback(testRunCls);
            });
        };        
        
        var async = require("async");
        async.forEach(
            i.tests, 
            // iterator
            function (currTest, asyncCallback) {          
                var robot = require('../libs/robot.js');
                robotOpen(robot, currTest, function () {  
                    testRunCls.robots.push({
                        url: robot.url,
                        asserts: robot.asserts,
                        statusCode: robot.statusCode,
                        error: robot.error,
                        result: robot.result,
                        pass: robot.pass
                    });
                    
                    // todo: add a method to get results from the rpbot
                    robot.asserts = []; // something is not right but this clears it, the object is killing assets across robot opens?
                    asyncCallback();
                });                
            },
            // end iterator
            // callback
            function(err) {
                testRunCls.endTime = Date.now();
                if(err !== null) {                    
                    finish("it's cool");                 
                }
                else {
                    finish("it's not cool! " + err);       
                }
            } // end callback
        ); // end async.forEach        
    };    
    
    // Create a single robot instruction
    function robotOpen(robot, currentTest, callback) {        
        robot.open(
            "test", 
            currentTest.url, 
            function (result) {                
                for (var j = 0; j < currentTest.checks.length; j++) {
                    performCheck(robot, currentTest.checks[j]);
                }
                callback(robot);
            }
        );
    }
    
    // Perform a single check, using reflection    
    function performCheck(robot, check) {
        var currentValidation = robot.check(check.selector);        
        if(typeof currentValidation[check.assert.assertType] !== 'function')
            throw "assertType does not define a function: " + check.assert.assertType;
            
        currentValidation[check.assert.assertType](check.assert.expected);
    }

    return testRunCls;
};