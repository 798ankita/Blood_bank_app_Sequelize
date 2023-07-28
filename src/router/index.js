const express = require("express");
const router = express.Router();
const userMiddleware = require("../middleware/userMiddleware");
const userRoutes = require('./userRoutes');


//*********************************User Routes*********************************/
//route getting all existing users
router.get("/users",userRoutes.routeAllUsers);

//route to create user
router.post("/register",userMiddleware.data,userRoutes.routeRegisterUsers);

//route to get one user
router.get("/user",userMiddleware.verifyToken,userRoutes.routeOneUser);

//route to delete a user
router.delete("/delete",userMiddleware.verifyToken,userRoutes.routeDeleteUser);

//route to login a user
router.patch("/login",userMiddleware.login,userRoutes.routeLoginUser);

//route to logout a user
router.put("/logout",userMiddleware.verifyToken,userRoutes.routelogoutUser);

//route to update a user
router.put("/updateUser",userMiddleware.verifyToken,userMiddleware.updatedUser,userRoutes.routeUpdateUser);

//route to create requests for blood by user
router.post("/sendBloodRequest",userMiddleware.verifyToken,userRoutes.routeSendBloodRequest);

/*********************************blood_bank_Routes******************************/

//route to create blood_bank
router.post("/register/blood_bank",userMiddleware.data,userRoutes.routeRegisterUsers);

//route to login a blood_bank
router.patch("/login/blood_bank",userMiddleware.login,userRoutes.routeLoginUser);



/*********************************SuperUser_Routes *******************************/

//route to login a super_user
router.patch("/login/superUser",userMiddleware.login,userRoutes.routeLoginUser);

router.get("/superUser/RequestsPending",userMiddleware.verifyToken,userRoutes.BloodBankRequest);

router.put("/superUser/AcceptRequest",userMiddleware.verifyToken,userMiddleware.updatedUser,userRoutes.AcceptRequest);

router.delete("/superUser/declineRequests",userMiddleware.verifyToken,userRoutes.declineRequests);

module.exports = router;
