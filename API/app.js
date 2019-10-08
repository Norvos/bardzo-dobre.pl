'use strict';
require("dotenv").config({path : '.env'});

import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import {router as UserRoutes} from './routes/userRoutes';
import {router as RestaurantRoutes} from './routes/restaurantRoutes';
import {router as DishRoutes} from './routes/dishRoutes';
import {router as OrderRoutes} from './routes/orderRoutes';

import {isUserLogin} from "./middleware/userAuth";
import {catchErrors} from './middleware/errorMiddleware';

const app = express();

const enableCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, PATCH, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Expose-Headers', 'Authorization')
  res.header('Access-Control-Allow-Credentials',true);

  if ('OPTIONS' === req.method) {
    res.sendStatus(200);
  }
  else {
    next();
  }
};

app.use(enableCrossDomain);

mongoose.connect(process.env.DB_STRING, {useNewUrlParser: true});
mongoose.set('useCreateIndex', true);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use(UserRoutes);
app.use(isUserLogin);

app.use(RestaurantRoutes);
app.use(DishRoutes);
app.use(OrderRoutes);
app.use(catchErrors);

export default app;
