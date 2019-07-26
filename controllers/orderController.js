const Order = require("../models/order");

exports.add = async (req, res, next) => {
    await Order.create(req);
    res.status(200).json({});
    if (process.env.NODE_ENV === 'development') console.log('Order created');
};

exports.changeToInProgress = async (req, res, next) => {
  await Order.changeToInProgress(req);
  res.status(200).json({});
  if (process.env.NODE_ENV === 'development') console.log("Order change to 'In progress'");
};

exports.changeToInDelivery = async (req, res, next) => {
  await Order.changeToInDelivery(req);
  res.status(200).json({});
  if (process.env.NODE_ENV === 'development') console.log("Order change to 'In delivery'");
};

exports.changeToFinalised = async (req, res, next) => {
  await Order.changeToFinalised(req);
  res.status(200).json({});
  if (process.env.NODE_ENV === 'development') console.log("Order change to 'Finalised'");
};

exports.getMyTodaysOrders = async (req, res, next) => {
  res.status(200).json(await Order.getMyTodaysOrders(req));
};

exports.remove  = async (req, res, next) => {
  await Order.remove(req);
  res.status(200).json({});
  if (process.env.NODE_ENV === 'development') console.log("Order has been removed");
};