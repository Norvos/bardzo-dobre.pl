import mongoose from 'mongoose';
const Order = require("./order");
var Schema = mongoose.Schema;
 
var RestaurantSchema = new Schema({
    name: {type: String, required: [true,"Name is required"]},
    address: {type: String,required: [true,"Address is required"]},
    description: {type: String,required: [true,"Description is required"]},
    ownerID: {type: Schema.Types.ObjectId,required:[true,"Owner's id is required"]},
    open :{type: Boolean, required:true, default:true}
});
 
export const Restaurant = mongoose.model('Restaurant', RestaurantSchema);

export async function create(req){

  const restaurant = await Restaurant.findOne({
    name : req.body.name,
    ownerID: req.session.user_sid
  });

  if (restaurant) throw new Error("Restaurant already exists");

  await new Restaurant({
    name : req.body.name,
    address : req.body.address,
    description : req.body.description,
    ownerID: req.session.user_sid
  }).save();
}

export async function remove(req){

  const restaurant = await Restaurant.findOne({
    name : req.body.name,
    ownerID: req.session.user_sid
  });

  const orders = await Order.find({restaurantID : restaurant._id});

  orders.foreach(order => {
    if(order.state !== "Finalised")
    throw new Error("You cannot remove restaurant with orders in progress");
  });

  await restaurant.remove();
  
}

export async function search(req){
 return await Restaurant.find({address: {$regex: req.body.address, $options: 'i'}});
}

export async function open(req)
{
  const restaurant = await Restaurant.findById(req.body.restaurantID);

  if(!restaurant) throw new Error("Cannot find the restaurant");
  if(restaurant.open) throw new Error("Restaurant is already open");

  restaurant.open = "true";
  await restaurant.save();
}

export async function close(req)
{
  const restaurant = await Restaurant.findById(req.body.restaurantID);

  if(!restaurant) throw new Error("Cannot find the restaurant");
  if(!restaurant.open) throw new Error("Restaurant is already close");
  
  restaurant.open = "false";
  await restaurant.save();
}

module.exports = Restaurant;