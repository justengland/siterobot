// http://caolanmcmahon.com/posts/unit_testing_in_node_js/
// command line: nodeunit /tests/robot_test.js - separate files by spaces
var robot = require('../libs/robot.js');
exports.robot_check_valid = function(test){
    // test.expect(1);
    test.ok(false, "test not written");
    test.done();
};

//exports.robot_check_notFound = function(test){
//    test.ok(false, "test not written");
//    test.done();
//};
//
//exports.robot_check_null = function(test){
//    test.ok(false, "test not written");
//    test.done();
//};
//
//exports.robot_open_valid = function(test){
//    test.ok(false, "test not written");
//    test.done();
//};

exports.robot_open_healthgrades = function(test){      
    robot.open("http://www.healthgrades.com", function(data) { 
        test.ok(true, "healthgrades found");
        test.done();
    });
};

exports.robot_open_redirect = function(test){     
    robot.open("http://beta.healthgrades.com", function(data) { 
        test.ok(true, "robot_open_redirect");
        test.done();
    });
};

