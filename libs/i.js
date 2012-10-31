// Sample syntax
// i.open('http://google.com').check('input[name=q]').noVal()
//                            .check().val('Google Search');
// i.open('http://hg.com').check('input[name=q]').noVal()
//                            .check().val('Google Search');

// Just creat a private varable to hold the collection of openCls, that way it works like above.

exports.load = function(testRun) {
    var iCls = {
        testRun: testRun.load(),
        tests: []    
    };
    
    iCls.open = function (url) {
        return (function () {
            // Create the object
            var openCls = {
                checks: [],
                'url': url
            };
            
            // Return a list of elements to perform validations on.
            openCls.check = function (selector) {
                var checkItem = { 
                    'selector': selector,
                   // i: openCls,
                    val: function (expected) {
                        checkItem.assert = { 
                            assertType: 'val',
                            'expected': expected
                        };
                        // After validation return the main object, for fluent style.
                        return openCls;
                    },
                    noVal: function () {
                        checkItem.assert = { 
                            assertType: 'noVal',
                            'expected': null
                        };
                        // After validation return the main object, for fluent style.
                        return openCls;
                    }
                };
                
                openCls.checks.push(checkItem);
                return checkItem;
            };
        
            iCls.tests.push(openCls);
            return openCls;
        })();   
    }; // end open
    
    return iCls;
};

//exports.open = i.open;
//exports.src = i;
//exports.tests = i.tests;




 