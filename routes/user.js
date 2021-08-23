const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();

router.get('/users', userController.getUserList);

router.get('/userdetail/:id', userController.getUserDetails);

router.get('/saveuser', userController.saveUser);

router.get('/deleteuser/:id', userController.deleteUser);

module.exports = router; 