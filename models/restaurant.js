import mongoose from 'mongoose';

var Schema = mongoose.Schema;
 
var RestaurantSchema = new Schema({
    name: {type: String, required: true},
    address: {type: String,required: true},
    description: {type: String,required: true},
    ownerID: {type: Schema.Types.ObjectId,required:true},
    open :{type: Boolean, required:true, default:true}
});
 
var Restaurant = mongoose.model('Restaurant', RestaurantSchema);

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