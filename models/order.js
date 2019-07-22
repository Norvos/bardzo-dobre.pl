import mongoose from 'mongoose';
const Dish = require('./dish');

var Schema = mongoose.Schema;
 
var OrderSchema = new Schema({
    userID: {type: Schema.Types.ObjectId,required:true},
    restaurantID: {type: Schema.Types.ObjectId,required:true},
    dishes: {type: [Dish.DishSchema],required: true},
    orderedAt: {type: Date, default: Date.now},
    state: {type: String, required: true, default: "Ordered"}
});

var Order =  mongoose.model('Order', OrderSchema);

export async function create(req) {

  await new Order({
    userID: req.session.user_sid,
    restaurantID: req.body.restaurantID,
    dishes: req.body.dishes
  }).save();
}
module.exports = Order;