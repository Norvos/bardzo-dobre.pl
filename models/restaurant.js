import mongoose from 'mongoose';

var Schema = mongoose.Schema;
 
var RestaurantSchema = new Schema({
    name: {type: String, required: true},
    address: {type: String,required: true},
    description: {type: String,required: true},
    ownerID: {type: Schema.Types.ObjectId,required:true}
});
 
var Restaurant = mongoose.model('Restaurant', RestaurantSchema);

exports.create = async (req) =>{

  const restaurant = await Restaurant.findOne({
    name : req.body.name,
    ownerID: req.session.user_sid
  });

  if (restaurant) throw new Error("Restaurant already exists");

    await new Restaurant({
    name : req.body.name,
    address : req.body.address,
    description : req.body.description,
    ownerID: req.session.user_sid
  }).save();
};

module.exports = Restaurant;