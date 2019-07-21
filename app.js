require("dotenv").config({path : '.env'});
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import session from 'express-session';
const UserRoutes = require('./routes/userRoutes');
const RestaurantRoutes = require('./routes/restaurantRoutes');
const ErrorMiddleware = require('./middleware/errorMiddleware');

const app = express();

mongoose.connect(process.env.DB_STRING ,{useNewUrlParser: true});
mongoose.set('useCreateIndex', true);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
  key: 'user_sid',
  secret: 'qwerty',
  resave: false,
  saveUninitialized: false,
  cookie: {
      expires: 600000,
  },
}));

app.use((req, res, next) => {
  if (req.cookies.user_sid && !req.session.user_sid) {
      res.clearCookie('user_sid');        
  }
  next();
});

app.use(UserRoutes);
app.use(RestaurantRoutes);
app.use(ErrorMiddleware.catchErrors);

export default app;
