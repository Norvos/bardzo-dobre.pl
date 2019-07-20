const express = require("express");
const router = express.Router();
import UserController from '../controllers/userController';
const ErrorMiddleware = require('../middleware/errorMiddleware');

router.post('/login',
ErrorMiddleware.catchAsyncErrors(UserController.login));

router.post('/register',
ErrorMiddleware.catchAsyncErrors(UserController.register));

module.exports = router;