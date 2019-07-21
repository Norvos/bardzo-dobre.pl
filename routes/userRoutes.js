import { Router } from "express";
const router = Router();

import UserController from '../controllers/userController';
import ErrorMiddleware from '../middleware/errorMiddleware';

router.post('/user/login',
ErrorMiddleware.catchAsyncErrors(UserController.login));

router.post('/user/register',
ErrorMiddleware.catchAsyncErrors(UserController.register));

module.exports = router;
