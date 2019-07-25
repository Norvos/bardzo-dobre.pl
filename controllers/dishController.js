const Dish = require("../models/dish");

exports.add = async (req, res, next) => {
  await Dish.create(req);
  res.status(200).json({});
  if (process.env.NODE_ENV === 'development') console.log('Dish created');
};

exports.getAll = async (req, res, next) => {
  res.status(200).json(await Dish.getAll(req));
};

exports.remove = async (req, res, next) => {
  await Dish.remove(req);
  res.status(200).json({});
};

exports.edit = async (req, res, next) => {
  await Dish.edit(req);
  res.status(200).json({});
};
