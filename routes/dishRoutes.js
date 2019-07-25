import { Router } from "express";
const router = Router();

import ErrorMiddleware from '../middleware/errorMiddleware';
import UserAuth from '../middleware/userAuth';
import DishController from '../controllers/dishController';

router.post('/dish/add',
ErrorMiddleware.catchAsyncErrors(UserAuth.ownerAuthorize),
ErrorMiddleware.catchAsyncErrors(DishController.add));

router.get('/dish/getAll',
ErrorMiddleware.catchAsyncErrors(DishController.getAll));

router.delete('/dish/remove',
ErrorMiddleware.catchAsyncErrors(UserAuth.ownerAuthorize),
ErrorMiddleware.catchAsyncErrors(DishController.remove));

router.put('/dish/edit',
ErrorMiddleware.catchAsyncErrors(UserAuth.ownerAuthorize),
ErrorMiddleware.catchAsyncErrors(DishController.edit));

module.exports = router;
