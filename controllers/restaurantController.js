const Restaurant = require("../models/restaurant");

exports.add = async (req, res, next) => {
  await Restaurant.create(req);
  res.status(200).json({});
  if (process.env.NODE_ENV === 'development') console.log('Restaurant created');
};