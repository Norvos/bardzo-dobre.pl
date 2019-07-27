import * as User from "../models/user";

export async function login(req, res, next){
  await User.login(req);
  res.status(200).json({});
  if (process.env.NODE_ENV === 'development') console.log('LOGIN COMPLETE');
}

export async function register(req, res, next){
  await User.register(req);
  res.status(200).json({});
  if (process.env.NODE_ENV === 'development') console.log('REGISTER COMPLETE');
}

export async function getRestaurants(req, res, next){
  res.status(200).json(await User.getRestaurants(req));
}

export async function remove(req, res, next){
  await User.remove(req);
  res.status(200).json({});
  if (process.env.NODE_ENV === 'development') console.log('User has been removed');
}

export async function edit(req, res, next){
  await User.edit(req);
  res.status(200).json({});
  if (process.env.NODE_ENV === 'development') console.log('User has been edited');
}

export async function changePassword(req, res, next){
  await User.changePassword(req);
  res.status(200).json({});
  if (process.env.NODE_ENV === 'development') console.log("User's password has been edited");
}

