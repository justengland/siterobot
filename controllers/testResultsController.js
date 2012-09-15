var model =  require('../models/debug.js')('testResults.ejs');

    /*
    robot.open(
        "Fail Test", 
        "http://siterobot.justengland.c9.io/test.html", 
        function(result) {
            robot.check('title').val('Not SiteRobot Test Page');        
            model.robot = result;
        }
    );
    */

exports.loadTestResults = function (req, callback) {
    var result = require("../models/testResults.js");
    
    // Create Tests
    var i = require('../libs/i.js');
    i.open('http://siterobot.justengland.c9.io/test.html')
        .check('title').val('SiteRobot Test Page')
        .check('input[name=execution]').val('client');        
    
    var nodeFactory = require('../libs/robotNodeFactory.js');
    var robotFactory = require('../libs/robotFactory.js')(nodeFactory);
        
    robotFactory.check(i, function(result) {
        model.title = result;
        callback(model);
    });
};