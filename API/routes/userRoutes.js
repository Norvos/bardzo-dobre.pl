import { Router } from "express";
export const router = Router();

import {changePassword,edit,getRestaurants,login,register,remove} 
from '../controllers/userController';

import {catchAsyncErrors} from '../middleware/errorMiddleware';
import {ownerAuthorize, isUserLogin} from '../middleware/userAuth';

router.post('/user/login',
catchAsyncErrors(login));

router.post('/user/register',
catchAsyncErrors(register));

router.get('/user/restaurants',
catchAsyncErrors(ownerAuthorize),
catchAsyncErrors(getRestaurants));

router.delete('/user/remove',
isUserLogin,
catchAsyncErrors(remove));

router.put('/user/edit',
isUserLogin,
catchAsyncErrors(edit));

router.put('/user/changePassword',
isUserLogin,
catchAsyncErrors(changePassword));
