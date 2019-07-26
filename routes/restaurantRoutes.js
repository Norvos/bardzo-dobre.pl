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

router.put('/restaurant/open',
ErrorMiddleware.catchAsyncErrors(UserAuth.ownerAuthorize),
ErrorMiddleware.catchAsyncErrors(RestaurantController.open));

router.put('/restaurant/close',
ErrorMiddleware.catchAsyncErrors(UserAuth.ownerAuthorize),
ErrorMiddleware.catchAsyncErrors(RestaurantController.close));

router.delete('/restaurant/remove',
ErrorMiddleware.catchAsyncErrors(UserAuth.ownerAuthorize),
ErrorMiddleware.catchAsyncErrors(RestaurantController.remove));



module.exports = router;
