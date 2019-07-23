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

export async function changeToInProgress(req) {
  const order = await Order.findById(req.body.orderID);
  if(!order) throw new Error("Order not found");
  if(order.state === "Finalised") throw new Error("You cannot edit finished order");

  order.state = "In progress";
  await order.save();
}

export async function changeToInDelivery(req) {
  const order = await Order.findById(req.body.orderID);
  if(!order) throw new Error("Order not found");
  if(order.state === "Finalised") throw new Error("You cannot edit finished order");

  order.state = "In delivery";
  await order.save();
}

export async function changeToFinalised(req) {
  const order = await Order.findById(req.body.orderID);
  if(!order) throw new Error("Order not found");
  if(order.state === "Finalised") throw new Error("You cannot edit finished order");
  
  order.state = "Finalised";
  await order.save();
}

export async function getMyTodaysOrders(req) {
  const orders = await Order.find({
    restaurantID : req.body.restaurantID
  });
  const result = 
  orders.filter(order => order.orderedAt.getDate() === new Date().getDate());
  return result;
}
module.exports = Order;