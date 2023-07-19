const express = require('express');
const router = express.Router();
const userCtrl = require("../controller/userController");
const userMiddleware = require('../middleware/userMiddleware');

//@Description:route getting all existing users data
router.get('/users',userCtrl.getUsers);

//@Description:route to create user
router.post('/register',userMiddleware,userCtrl.postUsers);

//@Description:route to create user
router.get('/user/:id',userCtrl.getUser);
router.delete('/user/:id',userCtrl.deleteUser);
router.patch('/user/:id',userCtrl.updatedUser);


module.exports = router;
