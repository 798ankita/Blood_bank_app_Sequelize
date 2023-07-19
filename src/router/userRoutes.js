const express = require("express");
const router = express.Router();
const userCtrl = require("../controller/userController");
const userMiddleware = require("../middleware/userMiddleware");

//route getting all existing users
router.get("/users", userCtrl.getUsers);

//route to create user
router.post("/register", userMiddleware, userCtrl.postUsers);

//route to get one user
router.get("/user/:id", userCtrl.getUser);

//route to delete a user
router.delete("/user/:id", userCtrl.deleteUser);

//route to update a user
router.patch("/user/:id", userCtrl.updatedUser);

module.exports = router;
