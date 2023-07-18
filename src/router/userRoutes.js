const express = require('express');
const router = express.Router();
const userCtrl = require("../controller/userController");
const userMiddleware = require('../middleware/userMiddleware');

//@Description:This route is getting all existing users data
router.get('/users',userCtrl.getUsers);


//@Description:This route is to create user
router.post('/register',userMiddleware,userCtrl.postUsers);

// router.get('/user/:id',userCtrl.getUser);
// router.delete('/user/:id',userCtrl.deleteUser);
// router.patch('/user/:id',userCtrl.patchUser);


module.exports = router;
