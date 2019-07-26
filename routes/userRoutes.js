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

router.delete('/user/remove',
ErrorMiddleware.catchAsyncErrors(UserAuth.userLogin),
ErrorMiddleware.catchAsyncErrors(UserController.remove));

router.put('/user/edit',
ErrorMiddleware.catchAsyncErrors(UserAuth.userLogin),
ErrorMiddleware.catchAsyncErrors(UserController.edit));

router.put('/user/changePassword',
ErrorMiddleware.catchAsyncErrors(UserAuth.userLogin),
ErrorMiddleware.catchAsyncErrors(UserController.changePassword));

module.exports = router;
