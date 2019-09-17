import mongoose from 'mongoose';
import {Restaurant} from "./restaurant";
import {User} from './user';
const Schema = mongoose.Schema;

export const DishSchema = new Schema({
    name: {type: String, required: [true,"Name is required"]},
    cost: {type: Number, required: [true,"Cost is required"]},
    description: {type: String,required: [true,"Description is required"]},
    restaurantID: {type: Schema.Types.ObjectId,required:[true,"Restaurant's id is required"]},
    available: {type: Boolean, required: true, default: true},
    quantity : {type: Number}
},{versionKey: false});

// DishSchema.methods.toJSON = function() {
//   var obj = this.toObject();
//   delete obj.available;
//   return obj;
//  };

export const Dish = mongoose.model('Dish', DishSchema);

export async function create(req){

   const dish = await Dish.findOne({
    name : req.body.name,
    restaurantID: req.body.restaurantID
  });
   
  if (dish) throw new Error("Dish already exists");

  const restaurant = await Restaurant.findById(req.body.restaurantID);
 
  if(!restaurant) throw new Error("Cannot find restaurant");
  if(restaurant.permamentlyClosed) throw new Error("Restaurant is permamently closed");

  await new Dish({
      name : req.body.name,
      cost: req.body.cost,
      description: req.body.description,
      restaurantID: req.body.restaurantID
  }).save();
}

export async function remove (req) {

  const restaurant = await Restaurant.findById(req.body.restaurantID);
  if(!restaurant) throw new Error("Cannot find the restaurant");
  if(restaurant.open) throw new Error("Cannot remove the dish when the restaurant is open");
  
  const dish = await Dish.findById(req.body._id);

  if(dish) await dish.set('available',false).save();
  else throw new Error("Cannot find the dish");
}

export async function unremove (req) {

  const restaurant = await Restaurant.findById(req.body.restaurantID);
  if(!restaurant) throw new Error("Cannot find the restaurant");
 
  const dish = await Dish.findById(req.body._id);

  if(dish) await dish.set('available',true).save();
  else throw new Error("Cannot find the dish");
}



export async function edit(req)
{
  const dish = await Dish.findById(req.body._id);

  if (!dish) throw new Error("Cannot find the dish");
  //if (!dish.available) throw new Error("Cannot edit the unavailable dish");

  const restaurant = await Restaurant.findById(req.body.restaurantID);
  if(!restaurant) throw new Error("Cannot find the restaurant");
  if(restaurant.open) throw new Error("Cannot edit the dish when the restaurant is open");
  
  dish.name = req.body.name;
  dish.cost = req.body.cost;
  dish.description = req.body.description;
  await dish.save();
}

export async function getAll(req){
  if(!req.body.restaurantID) throw new Error(`Cannot find restaurant's id`);
  const restaurant = await Restaurant.findById(req.body.restaurantID);
  if(!restaurant) throw new Error("Cannot find the restaurant");

  const user = await User.findById(req.decoded.id);
  if(user.role === "Owner")
  {
    return await Dish.find({
      restaurantID: req.body.restaurantID
    });
  }else
  {
    return await Dish.find({
      restaurantID: req.body.restaurantID,
      available: true
    });
  }
 
}