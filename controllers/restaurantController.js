const Restaurant = require("../models/restaurant");

exports.add = async (req, res, next) => {
  await Restaurant.create(req);
  res.status(200).json({});
  if (process.env.NODE_ENV === 'development') console.log('Restaurant created');
};

exports.search = async(req, res, next) =>{
  res.status(200).json(await Restaurant.search(req));
};

exports.open = async(req, res, next) =>{
  await Restaurant.open(req);
  res.status(200).json({});
};

exports.close = async(req, res, next) =>{
  await Restaurant.close(req);
  res.status(200).json({});
};

exports.remove = async(req, res, next) =>{
  await Restaurant.remove(req);
  res.status(200).json({});
  if (process.env.NODE_ENV === 'development') console.log('Restaurant removed');
};