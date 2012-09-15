var testResult = (function () {
    var resultCls = {
        template: 'debug.ejs'    
    };
    
    return resultCls;
})();

module.exports = function(template) {
    if(typeof template !== 'undefined') 
        testResult.template = template;
        
    return testResult;
};
