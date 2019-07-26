const User = require("../models/user");

exports.login = async (req, res, next) => {
  await User.login(req);
  res.status(200).json({});
  if (process.env.NODE_ENV === 'development') console.log('LOGIN COMPLETE');
};

exports.register = async (req, res, next) => {
  await User.register(req);
  res.status(200).json({});
  if (process.env.NODE_ENV === 'development') console.log('REGISTER COMPLETE');
};

exports.getRestaurants = async (req, res, next) => {
  res.status(200).json(await User.getRestaurants(req));
};

exports.remove = async (req, res, next) => {
  await User.remove(req);
  res.status(200).json({});
  if (process.env.NODE_ENV === 'development') console.log('User has been removed');
};

exports.edit = async (req, res, next) => {
  await User.edit(req);
  res.status(200).json({});
  if (process.env.NODE_ENV === 'development') console.log('User has been edited');
};

exports.changePassword = async (req, res, next) => {
  await User.changePassword(req);
  res.status(200).json({});
  if (process.env.NODE_ENV === 'development') console.log("User's password has been edited");
};

