require("dotenv").config({path : '.env'});
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';

const UserRoutes = require('./routes/userRoutes');
const RestaurantRoutes = require('./routes/restaurantRoutes');
const DishRoutes = require('./routes/dishRoutes');
const ErrorMiddleware = require('./middleware/errorMiddleware');
const UserAuth = require("./middleware/userAuth");
const CookieMiddleware = require("./middleware/cookieMiddleware");

const app = express();

mongoose.connect(process.env.DB_STRING, {useNewUrlParser: true});
mongoose.set('useCreateIndex', true);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(CookieMiddleware.setSession);
app.use(CookieMiddleware.check);

app.use(UserRoutes);
app.use(UserAuth.userLogin);

app.use(RestaurantRoutes);
app.use(DishRoutes);
app.use(ErrorMiddleware.catchErrors);

export default app;
