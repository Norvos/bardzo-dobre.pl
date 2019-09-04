import { Router } from "express";
export const router = Router();

import {catchAsyncErrors,} from '../middleware/errorMiddleware';
import {ownerAuthorize,userAuthorize} from '../middleware/userAuth';
import {add,close,open,remove,search} from '../controllers/restaurantController';

router.post('/restaurant/add',
catchAsyncErrors(ownerAuthorize),
catchAsyncErrors(add));

router.post('/restaurant/search',
catchAsyncErrors(userAuthorize),
catchAsyncErrors(search)
);

router.put('/restaurant/open',
catchAsyncErrors(ownerAuthorize),
catchAsyncErrors(open));

router.put('/restaurant/close',
catchAsyncErrors(ownerAuthorize),
catchAsyncErrors(close));

router.delete('/restaurant/remove',
catchAsyncErrors(ownerAuthorize),
catchAsyncErrors(remove));

