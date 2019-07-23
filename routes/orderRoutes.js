import { Router } from "express";
const router = Router();

import ErrorMiddleware from '../middleware/errorMiddleware';
import UserAuth from '../middleware/userAuth';
import OrderController from '../controllers/orderController';

router.post('/order/add',
ErrorMiddleware.catchAsyncErrors(UserAuth.userAuthorize),
ErrorMiddleware.catchAsyncErrors(OrderController.add));

router.put('/order/changeToInProgress',
ErrorMiddleware.catchAsyncErrors(UserAuth.ownerAuthorize),
ErrorMiddleware.catchAsyncErrors(OrderController.changeToInProgress));

router.put('/order/changeToInDelivery',
ErrorMiddleware.catchAsyncErrors(UserAuth.ownerAuthorize),
ErrorMiddleware.catchAsyncErrors(OrderController.changeToInDelivery));

router.put('/order/changeToFinalised',
ErrorMiddleware.catchAsyncErrors(UserAuth.ownerAuthorize),
ErrorMiddleware.catchAsyncErrors(OrderController.changeToFinalised));

router.get('/order/getMyTodaysOrders',
ErrorMiddleware.catchAsyncErrors(UserAuth.ownerAuthorize),
ErrorMiddleware.catchAsyncErrors(OrderController.getMyTodaysOrders));

module.exports = router;