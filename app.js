'use strict';
require("dotenv").config({path : '.env'});

import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';

import {router as UserRoutes} from './routes/userRoutes';
import {router as RestaurantRoutes} from './routes/restaurantRoutes';
import {router as DishRoutes} from './routes/dishRoutes';
import {router as OrderRoutes} from './routes/orderRoutes';

import {catchErrors} from './middleware/errorMiddleware';
import {userLogin} from "./middleware/userAuth";
import {clearCookie,setSession} from "./middleware/cookieMiddleware";

const app = express();

mongoose.connect(process.env.DB_STRING, {useNewUrlParser: true});
mongoose.set('useCreateIndex', true);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(setSession);
app.use(clearCookie);

app.use(UserRoutes);
app.use(userLogin);

app.use(RestaurantRoutes);
app.use(DishRoutes);
app.use(OrderRoutes);
app.use(catchErrors);

export default app;
