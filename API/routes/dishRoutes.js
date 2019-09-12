import { Router } from "express";
export const router = Router();

import {catchAsyncErrors} from '../middleware/errorMiddleware';
import {ownerAuthorize, userAuthorize} from '../middleware/userAuth';
import {add,edit,getAll,remove} from "../controllers/dishController";

router.post('/dish/add',
catchAsyncErrors(ownerAuthorize),
catchAsyncErrors(add));

router.post('/dish/getAll',
catchAsyncErrors(getAll));

router.delete('/dish/remove',
catchAsyncErrors(ownerAuthorize),
catchAsyncErrors(remove));

router.put('/dish/edit',
catchAsyncErrors(ownerAuthorize),
catchAsyncErrors(edit));
