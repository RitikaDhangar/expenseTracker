const express = require('express');
const router = express.Router();
const User = require('../controller/userRegister');
router.post('/createUser', User.createUser);
router.post('/loginUser', User.loginUser);
module.exports=router
