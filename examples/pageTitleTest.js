robot.open("http://siterobot.justengland.c9.io/debug", function() {
    robot.expect.val("SiteRobot Debug Page").ele("title") // The title ele should have a value
    robot.expect.val("Client").ele("label[for='client']") // the label should have a value
    robot.expect.val("value", "go!").attr("#submit", "value") // The input should have an attribute with a name of [value] and value of [go!]
}); // Open the webpage by url


