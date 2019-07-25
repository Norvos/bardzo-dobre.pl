import mongoose from 'mongoose';
const Restaurant = require("./restaurant");

var Schema = mongoose.Schema;

export var DishSchema = new Schema({
    name: {type: String, required: [true,"Name is required"]},
    cost: {type: Number, required: [true,"Cost is required"]},
    description: {type: String,required: [true,"Description is required"]},
    restaurantID: {type: Schema.Types.ObjectId,required:[true,"Restaurant's id is required"]}
});

var Dish = mongoose.model('Dish', DishSchema);

export async function create(req){

   const dish = await Dish.findOne({
    name : req.body.name,
    restaurantID: req.body.restaurantID
  });
   
  if (dish) throw new Error("Dish already exists");

  const restaurant = await Restaurant.Restaurant.findById(req.body.restaurantID);
 
  if(!restaurant) throw new Error("Cannot find restaurant");

  await new Dish({
      name : req.body.name,
      cost: req.body.cost,
      description: req.body.description,
      restaurantID: req.body.restaurantID
  }).save();
}

export async function remove(req) {

  const restaurant = await Restaurant.Restaurant.findById(req.body.restaurantID);
  if(restaurant.open) throw new Error("Cannot remove the dish when the restaurant is open");
  
  const dish = await Dish.findOne(
    { 
      name: req.body.name,
      restaurantID: req.body.restaurantID
    });

  if(dish) await Dish.remove(dish);
  else throw new Error("Cannot find the dish");
}

export async function edit(req)
{
  const dish = await Dish.findById(req.body._id);

  if (!dish) throw new Error("Cannot find the dish");

  const restaurant = await Restaurant.Restaurant.findById(req.body.restaurantID);
  if(!restaurant) throw new Error("Cannot find the restaurant");
  if(restaurant.open) throw new Error("Cannot edit the dish when the restaurant is open");

  dish.name = req.body.name;
  dish.cost = req.body.cost;
  dish.description = req.body.description;
  await dish.save();
}

export async function getAll(req){
  if(!req.body.restaurantID) throw new Error("Cannot find restaurant's id");
  return await Dish.find({restaurantID: req.body.restaurantID});
}

module.exports = Dish;