const User = require("../models/user");

exports.login = async (req, res, next) => {
  res.json(await User.login(req));
  console.log('LOGIN COMPLETE');
};

exports.register = async (req, res, next) => {
  await User.register(req); 
  console.log('REGISTER COMPLETE');
};

