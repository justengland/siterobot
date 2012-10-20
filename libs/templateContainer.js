// This is a templating helper class, used for partials
var dirName = "";

var templateRef = {
    ejs: require('ejs'),
    fs: require('fs')
};

// Create the per instance object for the page.
exports.load = function () {
    var templateCls = {};
    templateCls.page = { 
        title: '',
        headline: '',
        bodyTemplate: 'twoColumn.ejs',
        main: [],
        sidebar: []
    };  
     
    
    // Hidden for now
    function render (templateFileName, model) {
        // todo: how does it handle a file that does not exsist.
        // todo: we may need an easier way to interact with files.
        // todo: make async
        var viewName = dirName + '/views/' + templateFileName + '.ejs';
        var str = templateRef.fs.readFileSync(viewName, 'utf8');    
        return templateRef.ejs.render(str, model); 
    }
    
    templateCls.addMain = function(templateFileName, model) {
        templateCls.page.main.push(render(templateFileName, model));
    };
    
    templateCls.addSidebar = function(templateFileName, model) {
        templateCls.page.sidebar.push(render(templateFileName, model));
    };
    
    return templateCls;  
};

exports.setDirname = function (dir) {
    dirName = dir;
};

exports.setDemo = function () {
    var template = exports.load();
    template.page.title = "Tasty Burger!",
    template.page.headline = "Uuummmm, this is a tasty burger!";
    
    template.page.main = [
        "<h3>No man, I don't eat pork</h3><p>Yeah, I like animals better than people sometimes... Especially dogs. Dogs are the best. Every time you come home, they act like they haven't seen you in a year. And the good thing about dogs... is they got different dogs for different people. Like pit bulls. The dog of dogs. Pit bull can be the right man's best friend... or the wrong man's worst enemy. You going to give me a dog for a pet, give me a pit bull. Give me... Raoul. Right, Omar? Give me Raoul.</p>",
        "<h3>Is she dead, yes or no?</h3><p>Your bones don't break, mine do. That's clear. Your cells react to bacteria and viruses differently than mine. You don't get sick, I do. That's also clear. But for some reason, you and I react the exact same way to water. We swallow it too fast, we choke. We get some in our lungs, we drown. However unreal it may seem, we are connected, you and I. We're on the same curve, just on opposite ends.</p>",
        "<h3>I can do that</h3><p>You think water moves fast? You should see ice. It moves like it has a mind. Like it knows it killed the world once and got a taste for murder. After the avalanche, it took us a week to climb out. Now, I don't know exactly when we turned on each other, but I know that seven of us survived the slide... and only five made it out. Now we took an oath, that I'm breaking now. We said we'd say it was the snow that killed the other two, but it wasn't. Nature is lethal but it doesn't hold a candle to man. </p>",
        "<div style='display:none;'><a href='http://slipsum.com'>lorem ipsum</a></div>"
    ];
    
    template.page.sidebar = [
        "<h4>I'm serious as a heart attack</h4><p>Now that we know who you are, I know who I am. I'm not a mistake! It all makes sense! </p>",
        "<h4>We happy?</h4><ul><li>Now that we know who you are</li> <li>I know who I am</li>  <li>I'm not a mistake!</li>  <li>It all makes sense!</li> </ul>"        
    ];
    
    return template;
};

