import mongoose from 'mongoose';
const Restaurant = require("./restaurant");

var Schema = mongoose.Schema;
 
var DishSchema = new Schema({
    name: {type: String, required: true},
    cost: {type: Number, required: true},
    description: {type: String,required: true},
    restaurantID: {type: Schema.Types.ObjectId,required:true}
});
 
var Dish = mongoose.model('Dish', DishSchema);

exports.create = async (req) =>{

  const dish = await Dish.findOne({
    name : req.body.name,
    restaurantID: req.body.restaurantID
  });
   
  if (dish) throw new Error("Dish already exists");

  const restaurant = await Restaurant.findById(req.body.restaurantID);

  if(!restaurant)  throw new Error("Cannot find restaurant");

    await new Dish({
      name : req.body.name,
      cost: req.body.cost,
      description: req.body.description,
      restaurantID: req.body.restaurantID
  }).save();
};

module.exports = Restaurant;