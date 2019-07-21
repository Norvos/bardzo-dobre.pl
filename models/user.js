import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const Restaurant = require("./restaurant");

var Schema = mongoose.Schema;
 
var UserSchema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    address: {type: String,required: true},
    email: {type: String, unique: true,required: true,trim: true},
    role: {type: String, default: 'User'},
    password: {type: String, required: true},
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

export async function getRestaurants(req){
return await Restaurant.find({ownerID : req.session.user_sid});}

module.exports = User;