import * as Dish from "../models/dish";

export async function add(req, res, next){
  await Dish.create(req);
  res.status(200).json({});
  if (process.env.NODE_ENV === 'development') console.log('Dish created');
}

export async function getAll(req, res, next){
  res.status(200).json(await Dish.getAll(req));
}

export async function remove(req, res, next){
  await Dish.remove(req);
  res.status(200).json({});
}

export async function unremove(req, res, next){
  await Dish.unremove(req);
  res.status(200).json({});
}

export async function edit(req, res, next){
  await Dish.edit(req);
  res.status(200).json({});
}