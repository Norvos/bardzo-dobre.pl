import * as  Order from "../models/order";

export async function add(req, res, next){
    await Order.create(req);
    res.status(200).json({});
    if (process.env.NODE_ENV === 'development') console.log('Order created');
}

export async function changeToInProgress(req, res, next){
  await Order.changeToInProgress(req);
  res.status(200).json({});
  if (process.env.NODE_ENV === 'development') console.log("Order change to 'In progress'");
}

export async function changeToInDelivery(req, res, next){
  await Order.changeToInDelivery(req);
  res.status(200).json({});
  if (process.env.NODE_ENV === 'development') console.log("Order change to 'In delivery'");
}

export async function changeToFinalised(req, res, next){
  await Order.changeToFinalised(req);
  res.status(200).json({});
  if (process.env.NODE_ENV === 'development') console.log("Order change to 'Finalised'");
}

export async function getMyTodaysOrders(req, res, next){
  res.status(200).json(await Order.getMyTodaysOrders(req));
}

export async function remove(req, res, next){
  await Order.remove(req);
  res.status(200).json({});
  if (process.env.NODE_ENV === 'development') console.log("Order has been removed");
}

export async function getAllOrders(req, res, next){
  res.status(200).json(await Order.getAllOrders(req));
}