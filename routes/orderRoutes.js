import { Router } from "express";
const router = Router();

import ErrorMiddleware from '../middleware/errorMiddleware';
import UserAuth from '../middleware/userAuth';
import OrderController from '../controllers/orderController';

router.post('/order/add',
ErrorMiddleware.catchAsyncErrors(UserAuth.userAuthorize),
ErrorMiddleware.catchAsyncErrors(OrderController.add));

module.exports = router;