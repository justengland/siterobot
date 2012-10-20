// This is a templating helper class, used for partials
var template = (function() { 
    
    var templateCls = { 
        dirName: "",
        ejs: require('ejs'),
        fs: require('fs')
    };
    
    templateCls.setDirname = function (dirName) {
        templateCls.dirName = dirName;
    };
    
    templateCls.render = function(templateFileName, model) {
        // todo: how does it handle a file that does not exsist.
        // todo: we may need an easier way to interact with files.
        // todo: make async
        var dirName = templateCls.dirName + '/views/';
        var str = templateCls.fs.readFileSync(dirName + templateFileName + '.ejs', 'utf8');    
        return templateCls.ejs.render(str, model); 
    };
    
    return templateCls;    
})();

exports.render = function(templateFileName, model) {
    return template.render(templateFileName, model);
};

exports.setDirname = function (dirName) {
    return template.setDirname(dirName);
};