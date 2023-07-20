const userCtrl = require("../controller/userController");

//route getting all existing users
exports.routeAllUsers = userCtrl.getUsers;

//route to create user
exports.routeRegisterUsers = userCtrl.postUsers;

//route to get one user
exports.routeOneUser= userCtrl.getUser;

//route to delete a user
exports.routeDeleteUser = userCtrl.deleteUser;

//route to login a user
exports.routeLoginUser = userCtrl.loginUser;

//route to update a user
exports.routeUpdateUser = userCtrl.updatedUser;

