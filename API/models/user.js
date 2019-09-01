import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import {Restaurant} from "./restaurant";
import {Order} from"./order";

const Schema = mongoose.Schema;
 
const UserSchema = new Schema({
    firstName: {type: String, required: [true,"First name is required"]},
    lastName: {type: String, required: [true,"Last name is required"]},
    address: {type: String,required: [true,"Address is required"]},
    email: {type: String, unique: true, required: [true,"Email is required"]},
    role: {type: String, default: 'User',enum: ['User','Owner','Deactivated']},
    password: {type: String, required: [true,"Password is required"]},
    createdAt: {type: Date, default: Date.now},
},{versionKey: false});

UserSchema.methods.toJSON = function() {
  var obj = this.toObject();
  delete obj.password;
  return obj;
 };
 
export const User =  mongoose.model('User', UserSchema);

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
  else if(user.role === "Deactivated")
    throw new Error("You account has been deactivated");
  else {
    req.session.user_sid = user._id;
  }
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
  const user = await User.findById(req.session.user_sid);
  const orders = await Order.find({userID : user._id});

  orders.forEach(order => {
    if(order.state !== "Finalised")
    throw new Error("You cannot remove user with orders in progress");
  });

  if(user.role === "Owner")
  {
    const restaurants = await Restaurant.find({ownerID: user._id});
    restaurants.forEach(restaurant => 
      {
       if(!restaurant.permamentlyClosed)
       throw new Error("You cannot remove user who owns an open restaurant");
      });
  }
  await user.set("role","Deactivated").save();
}

export async function edit(req)
{
  const user = await User.findById(req.session.user_sid);

  const orders = await Order.find({userID : user._id});

  orders.forEach(order => {
    if(order.state !== "Finalised")
    throw new Error("You cannot edit user with orders in progress");
  });

  user.address = req.body.address;
  user.email = req.body.email;
    
  await user.save();
}

export async function changePassword(req)
{
  const user = await User.findById(req.session.user_sid);

  if(!user) throw new Error("Cannot find the user");
  if(!validPassword(user,req.body.password))throw new Error("Invalid credentials");

  user.password = bcrypt.hashSync(req.body.newPassword,bcrypt.genSaltSync());

  await user.save();
}

export async function getRestaurants(req){
return await Restaurant.find(
  {ownerID : req.session.user_sid,
  permamentlyClosed : false
  });}
