import mongoose from 'mongoose';
 
var Schema = mongoose.Schema;
 
var UserSchema = new Schema({
    userID: Schema.Types.ObjectId,
    firstName: String,
    lastName: String,
    address: String,
    email: String,
    role: String,
    password: String,
    createdAt: { type: Date, default: Date.now },
});
 
export default mongoose.model('User', UserSchema);