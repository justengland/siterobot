exports.create = function (template, req, callback) {    
    template.page.title = 'Test Results';
    template.page.headline = 'Robot Results';
    template.addMain('editorCreate', {});
    
    callback(template); 
};

exports.edit = function (template, req, callback) {    
    
};

exports.index = function (template, req, callback) {    
    
};