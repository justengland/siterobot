var Robot = Robot || {};

Robot.open = function (url, callback) {
    Robot.get(url, callback);
    return 'here';
};
