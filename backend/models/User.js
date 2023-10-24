const mongoose =require('mongoose');
const Order = require('./Order.js');
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  profilePicturePath: { type: String },
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: Order}],
  gender: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  joinedOn: { type: Date},
});

module.exports=mongoose.model("User",userSchema)