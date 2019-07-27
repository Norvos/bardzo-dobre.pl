import { Router } from "express";
export const router = Router();

import {changePassword,edit,getRestaurants,login,register,remove} 
from '../controllers/userController';

import {catchAsyncErrors} from '../middleware/errorMiddleware';
import {ownerAuthorize,userLogin} from '../middleware/userAuth';

router.post('/user/login',
catchAsyncErrors(login));

router.post('/user/register',
catchAsyncErrors(register));

router.get('/user/restaurants',
userLogin,
catchAsyncErrors(ownerAuthorize),
catchAsyncErrors(getRestaurants));

router.delete('/user/remove',
catchAsyncErrors(userLogin),
catchAsyncErrors(remove));

router.put('/user/edit',
catchAsyncErrors(userLogin),
catchAsyncErrors(edit));

router.put('/user/changePassword',
catchAsyncErrors(userLogin),
catchAsyncErrors(changePassword));
