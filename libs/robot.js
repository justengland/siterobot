var robot = (function () {

    // Constructor
    var robotCls = function() { };
    
    // Fields
    robotCls.statusCode = -1,
    robotCls.error = null, // Should be refactored to a custom object
    robotCls.pass = true,
    robotCls.domBase = null,
    robotCls.result = true;
    robotCls.asserts = [];
    
    robotCls.open = function (title, url, callback) {
        var request = require('request'),
            cheerio = require('cheerio'),
            result = this;
        result.title = title;
        request(url, function (error, response, body) {
            // Setup the robot object
            result.error = error;            
            result.statusCode = response.statusCode;
            
            // This is the wrapping call to log the request.
            var finish = function (finishResult) {
                //var mongo = require('../libs/mongo.js');
                result.assertDate = Date.now();
                result.url = url;
                // mongo.insert('robotAssert2', result, function() { 
                    result.pass = true;
                    callback(result);
                //});
            };
            
            // General Error
            if( error !== null) {
                robotCls.assert("request error", error, false);
            }
            
            // Valid response
            if (response.statusCode == 200) {                    
                robotCls.domBase = cheerio.load(body);
                robotCls.currentElement = robotCls.domBase;
                robotCls.assert("valid web request", url, true);
            }
            else {
                robotCls.assert("invalid status code", response.statusCode, false);
            }
        
            finish("unhandled response.statusCode: \n" + response.statusCode);            
        });         
    };
    
    // Return a list of elements to perform validations on.
    robotCls.check = function (selector) {
        robotCls.element._source = robotCls.domBase(selector);     
        return robotCls.element;
    };
    
    robotCls.element = { 
        _source: null,
        val: function(expected) {    
            if(typeof expected !== 'undefined') {
                robotCls.assert('ele:val', 'find the value of element', function () {
                     return robotCls.element._source.text() === expected;
                });
            }
             
            return this._source.text();
        },
        attr: function() {            
            return this._source.attr();
        }
    };
    
    // Asserts
    robotCls.assert = function (name, message, pass) {
        
        var passResult = false;
        try {
            passResult = pass();
        }
        catch(e) {
            robotCls.pass = false;
            pass = false;
            message = e;
        }
        
        if(!passResult)
            robotCls.pass = false;
            
        robotCls.asserts.push({'name': name, 'pass': passResult, 'message': message});
        // ** TODO return add more info into the robot object **
    };
    
    return robotCls;
})();

// Module Exports
exports.open = robot.open;
exports.check = robot.check;
exports.element = robot.element;

