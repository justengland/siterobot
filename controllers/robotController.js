var modelObject = require('../models/debug.js');
var model = new modelObject('robot.ejs');
var testRun = require('../libs/testRun.js');
var robot = require('../libs/robot.js');

exports.loadIModel = function (request, callback) {          
    
    var i = require('../libs/i.js');
    i.open('http://google.com')
        .check('input[name=q]').noVal()
        .check('input[name=q]').val('Google Search');
                               
    model.isPost = true;
    // model.debugText = request.body.debugText;
    model.output = "Cool";
    
    var nodeFactory = require('../libs/robotNodeFactory.js');
    var robotFactory = require('../libs/robotFactory.js')(nodeFactory);
    
    model.debugText = robotFactory.check(i);
    model.robot = robot;
    
    callback(robot);
};

exports.loadTestRunModel = function (request, callback) {   
    model.isPost = true;
    model.debugText = request.body.debugText;
    testRun.test(
        // run tests
        function () {
            robot.open (
                "Pass Test", 
                "http://siterobot.justengland.c9.io/test.html", 
                function(result) {
                    robot.check('title').val('SiteRobot Test Page');                
                    model.robot = result;
                }
            );
            robot.open(
                "Fail Test", 
                "http://siterobot.justengland.c9.io/test.html", 
                function(result) {
                    robot.check('title').val('Not SiteRobot Test Page');        
                    model.robot = result;
                }
            );
        },
        
        // callback
        function(result) {
            model.robot = testRun.robots[0];
            callback(model);
        }
    );

    /*
    testRun.robots = [
        function() { 
            robot.open (
                "Pass Test", 
                "http://siterobot.justengland.c9.io/test.html", 
                function(result) {
                    robot.check('title').val('SiteRobot Test Page');                
                    model.robot = result;
                }
            );
        },
        function() { 
            robot.open(
                "Fail Test", 
                "http://siterobot.justengland.c9.io/test.html", 
                function(result) {
                    robot.check('title').val('Not SiteRobot Test Page');        
                    model.robot = result;
                }
            );
        }
    ];
    
    testRun.test(function(result) {
        model.robot = testRun.robots[0];
        callback(model);
    });
    */
};
    
exports.loadPassModel = function (request, callback) {            
    model.isPost = true;
    model.debugText = request.body.debugText;
    model.output = "Cool";
    robot.open (
        "Pass Test", 
        "http://siterobot.justengland.c9.io/test.html", 
        function(result) {
            robot.check('title').val('SiteRobot Test Page');
            
            model.robot = result;
            callback(model);
        }
    ); 
};

exports.loadFailModel = function (request, callback) {            
    model.isPost = true;
    model.debugText = request.body.debugText;
    
    model.output = robot.open("Fail Test", "http://siterobot.justengland.c9.io/test.html", function(result) {
        robot.check('title').val('Not SiteRobot Test Page');        
        // return the model so it is easy report.
        model.robot = result;
        callback(model);
    }); 
};
