import mongoose from 'mongoose';
import {DishSchema} from './dish';
import {Restaurant} from './restaurant';

const Schema = mongoose.Schema;
 
const OrderSchema = new Schema({
    userID: {type: Schema.Types.ObjectId,required:true},
    restaurantID: {type: Schema.Types.ObjectId,required: [true,"Restaurant's id is reqired"]},
    dishes: {type: [DishSchema],required: [true,"Select at least one dish"]},
    orderedAt: {type: Date, default: Date.now},
    state: {type: String, required: [true], default: "Ordered",
    enum: ["Finalised", "In progress", "In delivery", "Ordered"]}
},{versionKey: false});

export const Order =  mongoose.model('Order', OrderSchema);

export async function create(req) {

  const restaurant = await Restaurant.findById(req.body.restaurantID);
  if(!restaurant.open) throw new Error("Restaurant is closed right now");
  if(restaurant.permamentlyClosed)  throw new Error("Restaurant is permamently closed");

  await new Order({
    userID: req.session.user_sid,
    restaurantID: req.body.restaurantID,
    dishes: req.body.dishes
  }).save();
}


const getOrderForEdit = async (req) => {
  const order = await Order.findById(req.body.orderID);
  if(!order) throw new Error("Order not found");
  if(order.state === "Finalised") throw new Error("You cannot edit finished order");
  return order;
};

export async function remove(req){
  const order = await Order.findById(req.body._id);
  if(!order) throw new Error("Cannot find the order");
  if(order.state === "Ordered") await Order.deleteOne(order);
  else throw Error("You cannot remove in progress orders");
}

export async function changeToInProgress(req) {
  const order = await getOrderForEdit(req);
  order.state = "In progress";
  await order.save();
}

export async function changeToInDelivery(req) {
  const order = await getOrderForEdit(req);
  order.state = "In delivery";
  await order.save();
}

export async function changeToFinalised(req) {
  const order = await getOrderForEdit(req);
  order.state = "Finalised";
  await order.save();
}

export async function getMyTodaysOrders(req) {

  const restaurant = await Restaurant.findById(req.body.restaurantID);
  if(!restaurant) throw new Error("Cannot find restaurant");
  
  if(restaurant.ownerID != req.session.user_sid) 
  throw new Error("You cannot get someone's orders");

  const orders = await Order.find({restaurantID : req.body.restaurantID});
  
  return orders.filter(order => order.orderedAt.toLocaleDateString() === new Date().toLocaleDateString());
}

export async function getAllOrders(req) {

  const restaurant = await Restaurant.findById(req.body.restaurantID);
  if(!restaurant) throw new Error("Cannot find restaurant");
  
  if(restaurant.ownerID != req.session.user_sid) 
  throw new Error("You cannot get someone's orders");

  const result = await Order.find({restaurantID : req.body.restaurantID});
  if(!req.body.startDate && !req.body.endDate) return result;
  else if(req.body.startDate && req.body.endDate)
  {
    const startDate =  new Date(req.body.startDate);
    const endDate =  new Date(req.body.endDate);

    if(startDate == "Invalid Date" || endDate == "Invalid Date")
    throw new Error("Invalid data format");
   
    return result.filter(
    order => order.orderedAt >= startDate && order.orderedAt <= endDate);
  }
 
}