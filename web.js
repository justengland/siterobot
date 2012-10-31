/******************************************************************************
 * Setup the webserver.
 * Using the express webframework, and ejs templating.
 * I am trying to follow the MVC pattern.
 */
 
var express = require('express'),
    app = module.exports = express(),
    templateContainer = require('./libs/templateContainer.js');
    
// Configuration

app.configure(function(){
  app.enable("jsonp callback");
  
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(__dirname + '/public'));
  app.use(app.router);  
  
  // load the express-partials middleware
  // app.use(partials());
  templateContainer.setDirname(__dirname);
}); 

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

/******************************************************************************
 * Route Section
 */
// Base Route
app.get('/', function(req, res){
  res.send('Welcome to Site Robot');
});

app.get('/demo', function(req, res){
    res.render("twoColumn.ejs", templateContainer.setDemo());
});

app.get('/debug', function(req, res){
    var controller = require('./controllers/debugController.js');
    controller.loadModel(req, function(model) {  
        res.render(model.bodyTemplate, model);
    });    
});

app.post('/debug', function(req, res){
    var controller = require('./controllers/debugController.js');
    controller.loadModel(req, function(model) {  
        res.render(model.bodyTemplate, model);
    });    
});

app.get('/robot', function(req, res){
    var controller = require('./controllers/robotController.js');
    controller.loadPassModel(req, function(model) {  
        res.render(model.bodyTemplate, model);
    });    
});

app.get('/robot/fail', function(req, res){
    var controller = require('./controllers/robotController.js');
    controller.loadFailModel(req, function(model) {  
        res.render(model.bodyTemplate, model);
    });    
});

app.get('/robot/pass', function(req, res){
    var controller = require('./controllers/robotController.js');
    controller.loadPassModel(req, function(model) {  
        res.render(model.bodyTemplate, model);
    });    
});

app.get('/robot/test-run', function(req, res){
    var controller = require('./controllers/robotController.js');
    controller.loadTestRunModel(req, function(model) {  
        res.render(model.bodyTemplate, model);
    });    
});

app.get('/robot/i', function(req, res){
    var controller = require('./controllers/robotController.js');
    controller.loadIModel(req, function(model) {  
        res.render(model.bodyTemplate, model);
    });    
});

app.get('/test-results', function(req, res) {    
    var controller = require('./controllers/testResultsController.js');    
    var template = templateContainer.load();
    controller.loadTestResults(true, template, req, function(resultTemplate) {  
        res.render(resultTemplate.page.bodyTemplate, resultTemplate);
    });    
});

app.get('/test-results/iron', function(req, res) {    
    var controller = require('./controllers/testResultsController.js');    
    var template = templateContainer.load();
    controller.loadTestResults(false, template, req, function(resultTemplate) {  
        res.render(resultTemplate.page.bodyTemplate, resultTemplate);
    });    
});

app.get('/editor/create', function(req, res) {    
    var controller = require('./controllers/editorController.js');    
    var template = templateContainer.load();
    controller.create(template, req, function(resultTemplate) {  
        res.render(resultTemplate.page.bodyTemplate, resultTemplate);
    });    
});

/******************************************************************************
 * Start Web Server
 */
var port = process.env.PORT || 3000;
app.listen(port);
console.log("Express server listening on: " + port);