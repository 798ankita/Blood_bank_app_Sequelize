/* eslint-disable linebreak-style */
const express = require('express');

const router = express.Router();
const userMiddleware = require('../middleware/userMiddleware');
const userRoutes = require('./userRoutes');
const bloodBank = require('./bloodBankRoutes');

//* ********************************User Routes*********************************/
// route getting all existing users
router.get('/users', userRoutes.routeAllUsers);

// route to create user
router.post('/register', userRoutes.routeRegisterUsers);

// route to get one user
router.get('/user', userMiddleware.verifyToken, userRoutes.routeOneUser);

// route to delete a user
router.delete('/delete', userMiddleware.verifyToken, userRoutes.routeDeleteUser);

// route to login a user
router.patch('/login', userMiddleware.login, userRoutes.routeLoginUser);

// route to logout a user
router.put('/logout', userMiddleware.verifyToken, userRoutes.routelogoutUser);

// route to update a user
router.put('/updateUser', userMiddleware.verifyToken, userMiddleware.updatedUser, userRoutes.routeUpdateUser);

// route to see list of all blood banks.
router.get('/allBloodBanksList', bloodBank.allBloodBankDetail);

// route to create requests for blood by  patient user
router.post('/user/patient/sendBloodRequest', userMiddleware.verifyToken, userRoutes.SendBloodRequestPatient);

// route to send request to donate blood by donor user
router.post('/user/donor/sendRequest', userMiddleware.verifyToken, userRoutes.SendBloodRequestdonor);

// route to cancel the request for blood.
router.patch('/user/cancelBloodRequest', userMiddleware.verifyToken, userRoutes.routeCancelBloodRequest);

// route to complete payment by user
router.patch('/user/completePayment', userMiddleware.verifyToken, userRoutes.completePayment);

/** *******************************blood_bank_Routes***************************** */

// route to create blood_bank
router.post('/register/blood_bank', userMiddleware.data, userRoutes.routeRegisterUsers);

// route to login a blood_bank
router.patch('/login/blood_bank', userMiddleware.login, userRoutes.routeLoginUser);

// route to add blood bank details.
router.post('/addBloodBankDetails', userMiddleware.verifyToken, bloodBank.createBloodBank);

// route to get all created requests for blood by users.
router.get('/BloodBank/allBloodRequests', userMiddleware.verifyToken, bloodBank.allRequestsForBlood);

// route to accept blood requests created by user.
router.patch('/bloodBank/acceptBloodRequests', userMiddleware.verifyToken, bloodBank.acceptBloodRequests);

// route to add blood inventory details.
router.post('/bloodBank/addInventoryDetail', userMiddleware.verifyToken, bloodBank.addBloodInventory);

// route to update blood inventory details.
router.patch('/bloodBank/updateInventoryDetail', userMiddleware.verifyToken, bloodBank.updateBloodInventory);

// route to add blood price details.
router.post('/bloodBank/addBloodPrice', userMiddleware.verifyToken, bloodBank.addBloodPrice);

// route to update blood price details.
router.patch('/bloodBank/updateBloodPrice', userMiddleware.verifyToken, bloodBank.updateBloodPrice);

// route to increment in blood unit while collecting blood
router.patch('/bloodBank/bloodCollected', userMiddleware.verifyToken, bloodBank.IncrementBlood);

/** *******************************SuperUser_Routes ****************************** */

// route to login a super_user
router.patch('/login/superUser', userMiddleware.login, userRoutes.routeLoginUser);

router.get('/superUser/RequestsPending', userMiddleware.verifyToken, userRoutes.BloodBankRequest);

router.put('/superUser/AcceptRequest', userMiddleware.verifyToken, userMiddleware.updatedUser, userRoutes.AcceptRequest);

router.delete('/superUser/declineRequests', userMiddleware.verifyToken, userRoutes.declineRequests);

module.exports = router;
