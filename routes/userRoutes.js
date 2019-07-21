import { Router } from "express";
const router = Router();

import UserController from '../controllers/userController';
import ErrorMiddleware from '../middleware/errorMiddleware';
import UserAuth from '../middleware/userAuth';

router.post('/user/login',
ErrorMiddleware.catchAsyncErrors(UserController.login));

router.post('/user/register',
ErrorMiddleware.catchAsyncErrors(UserController.register));

router.get('/user/restaurants',
UserAuth.userLogin,
ErrorMiddleware.catchAsyncErrors(UserAuth.ownerAuthorize),
ErrorMiddleware.catchAsyncErrors(UserController.getRestaurants));

module.exports = router;
