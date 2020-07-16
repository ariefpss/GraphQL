var {addUser, loginUser} = require('./UserMutation');
var {addTask} = require('./TodoTaskMutation');

module.exports = {
    addUser,
    loginUser,
    addTask
};