/******************************************************************************
 * Setup the webserver.
 * Using the express webframework, and ejs templating.
 * I am trying to follow the MVC pattern.
 */
 
var express = require('express'); 
var app = module.exports = express(); 
// Configuration

app.configure(function(){
  app.enable("jsonp callback");
  
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(__dirname + '/public'));
  app.use(app.router);  
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

app.get('/test-results', function(req, res){
    var controller = require('./controllers/testResultsController.js');
    controller.loadTestResults(req, function(model) {  
        res.render(model.bodyTemplate, model);
    });    
});

/******************************************************************************
 * Start Web Server
 */
var port = process.env.PORT || 3000;
app.listen(port);
console.log("Express server listening on: " + port);