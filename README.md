Site Robot is a tool used to montor websites, that allows you to write simple 
tests with jquery selectors and fluent/BDD style syntaxt.

TODO Features
Environment varables - ie: dev,test,stage,production

Mongo hosted database
https://www.mongohq.com/databases/siterobot

mongodb://justengland:siteMongo@alex.mongohq.com:10070/siterobot

** TODO Features
Test UI 
    View all tests
    Test Create/Edit view - Code view
    Store Tests
    View test results
    View History

User Accounts
    unlimited users
    Profiles: admin, readonly
    create a user store -sass?
    
Headless browser with phantom js
    need to spin up instances at amazon, free teir?
    create a webservice on the web server to launch phantom js
    HAR support, in mongo
    
Time capsule: the ablity to make a restful call from a build to kick off testing
    We neen a warmer
    Charts to see changes over time with markers for each release  
    
reporting / compare:
    Be able to track changes in data over time.
    
Work Queue
    use amazon sqs        
    use a chron job to wake up and launch the phantom js instances from the webservice
    
Client side implimentation
    useful so developers can just use there browser instance
    log to data stores, so it can be used as a real test into local computers
    
Monitoring
    site down notification
    changes in compare
    performance
    
Chrome plug in
    create and store tests
    
** Pain points
Partial views are not native, 
keep checking, for an ejs update
Could switch to jade templates
footer does not let page scroll to the bottom
    