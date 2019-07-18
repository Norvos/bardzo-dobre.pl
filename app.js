require("dotenv").config({path : '.env'});
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';

const app = express();

mongoose.connect(process.env.DB_STRING ,{useNewUrlParser: true});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use((err , req, res, next) => {
  res.status(err.status || 500);

  if (process.env.NODE_ENV === 'development'){
    res.render('error', {
      message: err.message,
      error: err });
  }else {
    res.render('error', {
      message: err.message,
      error: {} });
    }
  });
    
export default app;
