const express = require('express');
const router = express.Router();
const userCtrl = require("../controller/userController");
// router.get('/users',userCtrl.getUsers);
// router.get('/user/:id',userCtrl.getUser);
router.post('/register',userCtrl.postUsers);
// router.delete('/user/:id',userCtrl.deleteUser);
// router.patch('/user/:id',userCtrl.patchUser);

module.exports = router;
