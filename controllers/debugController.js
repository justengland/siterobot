this.loadModel = function (request, callback) {        
    var modelObject = require('../models/debug.js');
    var model = new modelObject('debug.ejs');
    var playground = require('../libs/playground.js');
    
    if(typeof request.body.debugText !== 'undefined') {
        model.isPost = true;
        model.debugText = request.body.debugText;
        
        model.output = playground.exec(request.body.debugText, function(result) {
            model.output = result;
            callback(model);
        });
        // (model);
    }
    else {
        model.output = "no output";
        callback(model);
    }
};

