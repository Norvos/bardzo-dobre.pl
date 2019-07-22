import { Router } from "express";
const router = Router();

import ErrorMiddleware from '../middleware/errorMiddleware';
import UserAuth from '../middleware/userAuth';
import RestaurantController from '../controllers/restaurantController';

router.post('/restaurant/add',
ErrorMiddleware.catchAsyncErrors(UserAuth.ownerAuthorize),
ErrorMiddleware.catchAsyncErrors(RestaurantController.add));

router.get('/restaurant/search',
ErrorMiddleware.catchAsyncErrors(UserAuth.userAuthorize),
ErrorMiddleware.catchAsyncErrors(RestaurantController.search)
);
module.exports = router;
