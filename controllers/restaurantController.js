const Restaurant = require("../models/restaurant");

exports.add = async (req, res, next) => {
  await Restaurant.create(req);
  res.status(200).json({});
  if (process.env.NODE_ENV === 'development') console.log('Restaurant created');
};

exports.search = async(req, res, next) =>{
  res.status(200).json(await Restaurant.search(req));
};