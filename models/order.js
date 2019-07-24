import mongoose from 'mongoose';
const Dish = require('./dish');
const Restaurant = require('./restaurant');

var Schema = mongoose.Schema;
 
var OrderSchema = new Schema({
    userID: {type: Schema.Types.ObjectId,required:true},
    restaurantID: {type: Schema.Types.ObjectId,required: [true,"Restaurant's id is reqired"]},
    dishes: {type: [Dish.DishSchema],required: [true,"Select at least one dish"]},
    orderedAt: {type: Date, default: Date.now},
    state: {type: String, required: [true], default: "Ordered",
    enum: ["Finalised", "In progress", "In delivery", "Ordered"]}
});

var Order =  mongoose.model('Order', OrderSchema);

export async function create(req) {

  const restaurant = await Restaurant.findById(req.body.restaurantID);
  if(!restaurant.open) throw new Error("Restaurant is closed right now");

  await new Order({
    userID: req.session.user_sid,
    restaurantID: req.body.restaurantID,
    dishes: req.body.dishes
  }).save();
}

const getOrder = async (req) => {
  const order = await Order.findById(req.body.orderID);
  if(!order) throw new Error("Order not found");
  if(order.state === "Finalised") throw new Error("You cannot edit finished order");
  return order;
};

export async function changeToInProgress(req) {
  order = getOrder(req);
  order.state = "In progress";
  await order.save();
}

export async function changeToInDelivery(req) {
  order = getOrder(req);
  order.state = "In delivery";
  await order.save();
}

export async function changeToFinalised(req) {
  order = getOrder(req);
  order.state = "Finalised";
  await order.save();
}

export async function getMyTodaysOrders(req) {

  const restaurant = await Restaurant.findById(req.body.restaurantID);
  if(!restaurant) throw new Error("Cannot find restaurant");
  
  if(restaurant.ownerID != req.session.user_sid) 
  throw new Error("You cannot get someone's orders");

  const orders = await Order.find({restaurantID : req.body.restaurantID});

  const result = 
  orders.filter(order => order.orderedAt.getDate() === new Date().getDate());

  return result;
}
module.exports = Order;