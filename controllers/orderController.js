const Order = require("../models/order");

exports.add = async (req, res, next) => {
    await Order.create(req);
    res.status(200).json({});
    if (process.env.NODE_ENV === 'development') console.log('Order created');
};