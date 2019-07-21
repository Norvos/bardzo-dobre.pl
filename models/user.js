import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
var Schema = mongoose.Schema;
 
var UserSchema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    address: {type: String,required: true},
    email: { type: String, unique: true,required: true,trim: true },
    role: { type: String, default: 'User' },
    password: {type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});
 
var User =  mongoose.model('User', UserSchema);

const validPassword = function (user,password) {
  return bcrypt.compareSync(password, user.password);
};

module.exports.login = async (req) => {

  const email = req.body.email;
  const password = req.body.password;

  const user = await User.findOne({email : email});
  
    if (!user) 
      throw new Error("User not found");
    else if (!validPassword(user,password)) 
      throw new Error("Wrong password");
     else
     { 
       req.session.user_sid = user._id;
     }
      
};

exports.register = async (req) =>{

  const user = await User.findOne({email : req.body.email});
   
  if (user) throw new Error("User already exists");

  await new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      address: req.body.address,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password,bcrypt.genSaltSync()),
  }).save();
};

module.exports = User;