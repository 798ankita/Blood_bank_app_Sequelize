const userCtrl = require("../controller/userController");

/***********************************User************************************/
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

//route to logout a user
exports.routelogoutUser = userCtrl.logoutUser;

/******************************blood bank*******************************************/

//route to see requests for registrations from blood banks.
exports.BloodBankRequest = userCtrl.pendingRegister;

//route accept requests for registrations from blood banks.
exports.AcceptRequest = userCtrl.AcceptedRequests;

//route to decline requests for registrations from blood banks.
exports.declineRequests = userCtrl.declineRegister;



