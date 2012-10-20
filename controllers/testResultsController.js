var model =  require('../models/debug.js')('twoColumn.ejs');
var iSource = require('../libs/i.js'); 
var testRun = require('../libs/testRun.js');  
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

exports.loadTestResults = function (template, req, callback) {    
    
    
    // Create Tests
    var i = iSource.load(testRun);    
    i.open('http://siterobot.justengland.c9.io/bad-url.html')
        .check('h1').val('SiteRobot Test Page');
            
    i.open('http://siterobot.justengland.c9.io/test.html')
        .check('title').val('SiteRobot Test Page')
        .check('input[name=execution]').val('client'); 
  
    i.open('http://siterobot.justengland.c9.io/test.html')
        .check('title').noVal();
        
    i.open('http://siterobot.justengland.c9.io/test.html')
        .check('title').val('SiteRobot Test Page')
        .check('input[name=execution]').val('client'); 

    i.open('http://siterobot.justengland.c9.io/test.html')
        .check('title').val('SiteRobot Test Page'); 
        
    // Load the node factory, into the robotfactory and check the results.
    var nodeFactory = require('../libs/robotNodeFactory.js');
    var robotFactory = require('../libs/robotFactory.js')(nodeFactory);    
    
    robotFactory.save();
    // Use not to check the results.
//    robotFactory.check(i, function(testRun) {
//        // var model = {};
//        // model.title = result;
//        // callback(model);
//        template.page.title = 'Test Results';
//        template.page.headline = 'Robot Results';
//        template.addMain('testResults', testRun);
//        callback(template);
//    });
};