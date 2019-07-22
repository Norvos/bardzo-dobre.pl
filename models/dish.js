import mongoose from 'mongoose';
const Restaurant = require("./restaurant");

var Schema = mongoose.Schema;

export var DishSchema = new Schema({
    name: {type: String, required: true},
    cost: {type: Number, required: true},
    description: {type: String,required: true},
    restaurantID: {type: Schema.Types.ObjectId,required:true}
});

var Dish = mongoose.model('Dish', DishSchema);

export async function create(req){

   const dish = await Dish.findOne({
    name : req.body.name,
    restaurantID: req.body.restaurantID
  });
   
  if (dish) throw new Error("Dish already exists");

  const restaurant = await Restaurant.findById(req.body.restaurantID);

  if(!restaurant) throw new Error("Cannot find restaurant");

  await new Dish({
      name : req.body.name,
      cost: req.body.cost,
      description: req.body.description,
      restaurantID: req.body.restaurantID
  }).save();
}

export async function getAll(req){
  if(!req.body.restaurantID) throw new Error("Cannot find restaurant's id");
  return await Dish.find({restaurantID: req.body.restaurantID});
}

module.exports = Restaurant;