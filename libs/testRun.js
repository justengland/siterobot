var testRun = (function () {

    // Constructor
    var testRunCls = { 
        startTime: Date.now(),
        robots: [],
        results: []
    };
    
    // Use the i protocall to create robot tests
    testRunCls.test = function (i, callback) {
        var result = this;
        loadRobots(i);
        
        // This is the wrapping call to log the request.
        var finish = function (finishResult) {
            var mongo = require('../libs/mongo.js');
            result.assertDate = Date.now();
            mongo.insert('robotAssert3', result, function(obj) { 
                callback("inserted");
            });
        };
        
        var async = require("async");
        async.forEach(
            testRunCls.robots, 
            // iterator
            function (robot, asyncCallback) {
                robot(function(robotResult) {
                    testRunCls.results.push(robotResult);
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
        
        // finish("it's over");  
    };    
    
    // Create all robot instructions
    function loadRobots(i) {
        var robot = require('../libs/robot.js');
        for (var j = 0; j < i.tests.length; j++) {
            robotOpen(robot, i.tests[j]);
        }
    }
    
    // Create a single robot instruction
    function robotOpen(robot, currentTest) {
        robot.open(
            "test", 
            currentTest.url, 
            function (result) {
                for (var j = 0; j < currentTest.checks.length; j++) {
                    performCheck(currentTest.checks[j]);
                }
            }
        );
    }
    
    // Perform a single check, using reflection    
    function performCheck(robot, check) {
        var currentValidation = robot.check(check.selector);        
        if(typeof currentValidation[check.assert.assertType] === 'function')
            throw "assertType does not define a function: " + check.assert.assertType;
            
        currentValidation[check.assert.assertType](check.assert.expected);
    }

    return testRunCls;
})();

// Module Exports
exports.test = testRun.test;
exports.robots = testRun.robots;
exports.results = testRun.results;