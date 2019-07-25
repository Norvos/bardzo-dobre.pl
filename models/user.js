import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const Restaurant = require("./restaurant");
const Order = require("./order");

var Schema = mongoose.Schema;
 
var UserSchema = new Schema({
    firstName: {type: String, required: [true,"First name is required"]},
    lastName: {type: String, required: [true,"Last name is required"]},
    address: {type: String,required: [true,"Address is required"]},
    email: {type: String, unique: true, required: [true,"Email is required"]},
    role: {type: String, default: 'User'},
    password: {type: String, required: [true,"Password is required"]},
    createdAt: {type: Date, default: Date.now},
});
 
var User =  mongoose.model('User', UserSchema);

const validPassword = (user,password) =>
bcrypt.compareSync(password, user.password);

export async function login(req) {

  const email = req.body.email;
  const password = req.body.password;

  const user = await User.findOne({email : email});
  
  if (!user) 
    throw new Error("User not found");
  else if (!validPassword(user,password)) 
    throw new Error("Wrong password");
  else req.session.user_sid = user._id;
}

export async function register(req) {

  const user = await User.findOne({email : req.body.email});
   
  if (user) throw new Error("User already exists");

  await new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      address: req.body.address,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password,bcrypt.genSaltSync()),
  }).save();
}

export async function remove(req)
{
  const user = await User.findOne({email : req.body.email});
  const orders = await Order.find({userID : user._id});

  orders.foreach(order => {
    if(order.state !== "Finalised")
    throw new Error("You cannot remove user with orders in progress");
  });

  await user.remove();
}

export async function getRestaurants(req){
return await Restaurant.find({ownerID : req.session.user_sid});}

module.exports = User;