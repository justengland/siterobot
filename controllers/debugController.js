this.loadModel = function (request, callback) {        
    var modelObject = require('../models/debug.js'),
        model = new modelObject('debug.ejs');        

    if(typeof request.body.debugText !== 'undefined') {
        
        if(request.body.execution == "iron")
            model = loadIronIoTest (model, request, callback);
        else
            model = sandBoxTest (model, request, callback);
            
    }
    else {
        model.output = "no output";
        callback(model);
    }
};

function sandBoxTest(model, request, callback) {
    var playground = require('../libs/playground.js');
    model.isPost = true;
    model.debugText = request.body.debugText;
    
    model.output = playground.exec(request.body.debugText, function(result) {
        model.output = result;
        callback(model);
    });
}

function loadIronIoTest(model, request, callback) {
// Stu 
}

