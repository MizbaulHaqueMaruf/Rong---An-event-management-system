const { Schema, model } = require("mongoose");

const reviewSchema = new Schema({
  userId: {
    type: Schema.ObjectId,
    required: true,
  },
  eventId:{
    type: Schema.ObjectId,
    required: true,
  },
  comment: String,
  userName: String,
  stars: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
    default:3, 
  }
},{timestamps: true});

module.exports = model("Review", reviewSchema);

