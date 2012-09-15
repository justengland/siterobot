module.exports = function(template) {   
     this.bodyTemplate = template;
     this.isPost = false;
     this.debugText = 'Robot.open("http://www.google.com", function(data) { \n\t done(data); \n});';
     //this.debugText = 'request("http://test.com", function (error, response, body) {\n\tdone(body);\n});';
     
     return this;
};