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

exports.loadTestResults = function (useNode, template, req, callback) {    
        
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
    var resultFactory = {};
    var pageTitle = "";
    var pageHeadline = "";
    var mainTemplate = ""
    if(useNode)
    {    
        pageTitle = 'Test Results';
        pageHeadline = 'Robot Results';
        resultFactory = require('../libs/robotNodeFactory.js');
        mainTemplate = "testResults";
    }
        
    else
    {
        pageTitle = 'Iron Results: Test Results';
        pageHeadline = 'Iron Results: Robot Results';
        resultFactory = require('../libs/robotIronIoFactory.js');
        mainTemplate = "ironResults";
    }
        
        
    var robotFactory = require('../libs/robotFactory.js')(resultFactory);    

    // Use not to check the results.
    robotFactory.check(i, function(testRun) {
        // var model = {};
        // model.title = result;
        // callback(model);
        template.page.title = pageTitle;
        template.page.headline = pageHeadline;
        template.addMain(mainTemplate, testRun);
        callback(template);
    });
};