const express = require('express');
const router = express.Router();
var userCtrl = require("../controller/userController");
require("../config/index");

router.get('/users',userCtrl.getUsers);
router.get('/user/:id',userCtrl.getUser);
router.post('/register',userCtrl.postUsers);
router.delete('/user/:id',userCtrl.deleteUser);
router.patch('/user/:id',userCtrl.patchUser);

module.exports = router;
