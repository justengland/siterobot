exports.list = function (template, req, callback) {    
    
    template.page.title = "here are your tests";
    template.page.headline = "test list";
    var testList = {
        testList: [
            {name: 'testName1'},
            {name: 'testName2'},
            {name: 'testName3'}
        ]
    };
    template.addMain("testListList", testList); // Create main body template
    callback(template);   
};