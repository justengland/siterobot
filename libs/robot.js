module.exports = (function() {    
    // Constructor
    var robotCls = function() { };
    
    // Fields
    robotCls.statusCode = -1,
    robotCls.error = null, // Should be refactored to a custom object
    robotCls.pass = true,
    robotCls.domBase = null,
    robotCls.asserts = [];
    
    robotCls.open = function (title, url, callback) {        
        var request = require('request'),
            cheerio = require('cheerio'),
            result = this;
        result.title = title;        
        
        
        request({
                uri:url,
                headers : { 'user-agent': 'Site Robot 0.1' } // I have checked this
            },
            function (error, response, body) {                
                // This is the wrapping call to log the request.
                var finish = function (finishResult) {                
                    result.assertDate = Date.now();
                    result.url = url;
                        callback(result);
            };  
                
            // Setup the robot object
            result.error = error;    
            
            // General Error
            if(error !== null) {
                result.assert("request error", error, false);
            }
            
            var finishResponse = "valid";
            if(typeof response === 'undefined') {
                result.assert("response null error", null, false);                
                finishResponse = "response null error";
            }
            else {
                // Valid response
                result.statusCode = response.statusCode;                  
                if (response.statusCode == 200) {      
                    result.pass = true; // set this as the default
                    result.domBase = cheerio.load(body);
                    result.currentElement = robotCls.domBase;
                    result.assertPass("valid web request", "statusCode:" + response.statusCode);                    
                }
                else {
                    result.assertFail("invalid status code", response.statusCode);
                    finishResponse = "unhandled response.statusCode: \n" + response.statusCode;
                    result.error = "invalid status code: " + response.statusCode;
                }
            }   
            
            // Make sure we call finish with every response
            finish(finishResponse);   
        });         
    };
    
    // Return a list of elements to perform validations on.
    robotCls.check = function (selector) {        
        if(robotCls.error === null)
        {
            robotCls.element._source = robotCls.domBase(selector);  
            robotCls.element._selector = selector;
            robotCls.element._length = selector = robotCls.element._source.length;            
        }        
        return robotCls.element; 
    };
    
    robotCls.element = { 
        _source: null,
        val: function(expected) {  
            if(robotCls.error !== null)
                return null;
            
            if(typeof expected !== 'undefined') {
                robotCls.assert('ele:val', 'val:' + robotCls.element._selector + ' ele.length:' + robotCls.element._length, function () {
                     return robotCls.element._source.text() === expected;
                });
            }
             
            return this._source.text();
        },
        noVal: function() {   
            if(robotCls.error !== null)
                return null;
                
            robotCls.assert('ele:val', 'noVal: ' + robotCls.element._selector + ' ele.length:' + robotCls.element._length, function () {
                 return robotCls.element._source.text().trim().length === 0;
            });
             
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
    
    robotCls.assertPass = function (name, message) {
        robotCls.asserts.push({'name': name, 'pass': true, 'message': message});
    };
    
    robotCls.assertFail = function (name, message) {
        robotCls.pass = false;
        robotCls.asserts.push({'name': name, 'pass': false, 'message': message});
    };
    
    return robotCls;
})();


//exports.open = robot.open;
//exports.check = robot.check;
//// exports.element = robot.element;
//exports.asserts = robot.asserts; 

