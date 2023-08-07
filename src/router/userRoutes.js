const userCtrl = require("../controller/userController");
const actionCtrl = require("../controller/actionController");
/***********************************Users************************************/
//route getting all existing users
exports.routeAllUsers = userCtrl.getUsers;

//route to create user
exports.routeRegisterUsers = userCtrl.postUsers;

//route to get one user
exports.routeOneUser = userCtrl.getUser;

//route to delete a user
exports.routeDeleteUser = userCtrl.deleteUser;

//route to login a user
exports.routeLoginUser = userCtrl.loginUser;

//route to update a user
exports.routeUpdateUser = userCtrl.updatedUser;

//route to send request for blood by patient
exports.SendBloodRequestPatient = userCtrl.patientSendRequests;

//route to send request to donate blood by donor
exports.SendBloodRequestdonor = userCtrl.donorSendRequest;

//route to cancel  the request for blood.
exports.routeCancelBloodRequest = userCtrl.cancelRequest;

//route to logout a user
exports.routelogoutUser = userCtrl.logoutUser;

//route to complete the payment
exports.completePayment = actionCtrl.generateBill;

/******************************superUser routes*******************************************/

//route to see requests for registrations from blood banks.
exports.BloodBankRequest = userCtrl.pendingRegister;

//route accept requests for registrations from blood banks.
exports.AcceptRequest = userCtrl.AcceptedRequests;

//route to decline requests for registrations from blood banks.
exports.declineRequests = userCtrl.declineRegister;
