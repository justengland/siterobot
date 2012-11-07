var clientName = "Robby The Robot",
    clientId = "50968fd4d4209e000200001c";

exports.create = function (template, req, callback) { 
    var model =  require('../models/check.js');
    template.page.title = 'New Check';
    template.page.headline = 'Create a new check';
    template.addMain('editCheck', model.create(clientId, clientName));
    
    callback(template); 
};

exports.update = function (template, req, callback) {  
    var model =  require('../models/check.js'),
        check = loadCheck(model.create(clientId, clientName), req);
        
    // The model has everthing we need to load the object.
    model.save(check, function (result) {
        if(typeof result === 'undefined')
            throw 'result cannot be undefined';            
        
        template.page.title = 'Update Check';
        template.page.headline = 'Update Check';
        
        template.addMain('editCheck', check);
        
        callback(template);     
    });
};

exports.updateById = function (template, req, callback) {  
    var model =  require('../models/check.js'),
        check = loadCheck(model.create(clientId, clientName), req);
        
    // The model has everthing we need to load the object.
    model.get(id, function (result) {
        if(typeof result === 'undefined')
            throw 'result cannot be undefined';            
        
        template.page.title = 'Update Check';
        template.page.headline = 'Update Check';
        
        template.addMain('editCheck', check);
        
        callback(template);     
    });
};

exports.index = function (template, req, callback) {    
    var model =  require('../models/check.js');
        
    // The model has everthing we need to load the object.
    model.list(clientName, function (result) {
        if(typeof result === 'undefined')
            throw 'result cannot be undefined';            
        
        template.page.title = 'Check List';
        template.page.headline = 'All Checks';
        
        template.addMain('listCheck', {results:result});
        
        callback(template);     
    });
};

function loadCheck(check, req) {            
    check.name = req.body.name;
    check.check = req.body.check;
    
    if(typeof req.body.id === "string" && req.body.id.trim().length > 0)
        check.id = req.body.id;
    
    return check;
}