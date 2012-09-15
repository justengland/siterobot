var Robot = Robot || {};

Robot.get = function(url, callback) {
    jQuery.get(url, function(data){
        callback(data)
    })
}