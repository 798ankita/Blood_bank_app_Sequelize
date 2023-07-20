const express = require("express");
const router = express.Router();
const userMiddleware = require("../middleware/userMiddleware");
const userRoutes = require('./userRoutes');

//route getting all existing users
router.get("/users",userRoutes.routeAllUsers);

//route to create user
router.post("/register",userMiddleware.data,userRoutes.routeRegisterUsers);

//route to get one user
router.get("/user/:id",userRoutes.routeOneUser);

//route to delete a user
router.delete("/delete/:id",userMiddleware.verifyToken,userRoutes.routeDeleteUser);

//route to login a user
router.patch("/login",userMiddleware.login,userRoutes.routeLoginUser);

//route to logout a user
router.put("/logout/:id",userMiddleware.verifyToken,userRoutes.routelogoutUser);

//route to update a user
router.put("/updateUser/:id",userMiddleware.verifyToken,userMiddleware.updatedUser,userRoutes.routeUpdateUser);

module.exports = router;
