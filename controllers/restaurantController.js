import * as  Restaurant from "../models/restaurant";

export async function add (req, res, next){
  await Restaurant.create(req);
  res.status(200).json({});
  if (process.env.NODE_ENV === 'development') console.log('Restaurant created');
}

export async function search (req, res, next){
  res.status(200).json(await Restaurant.search(req));
}

export async function open(req, res, next){
  await Restaurant.open(req);
  res.status(200).json({});
}

export async function close(req, res, next){
  await Restaurant.close(req);
  res.status(200).json({});
}

export async function remove(req, res, next){
  await Restaurant.remove(req);
  res.status(200).json({});
  if (process.env.NODE_ENV === 'development') console.log('Restaurant removed');
}