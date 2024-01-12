const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  sellerId: {
    type: mongoose.Schema.ObjectId,
    required: true,
  },
  eventId: {
    type: mongoose.Schema.ObjectId,
    required: true,
  },
  eventTitle: { type: String, required: true },
  eventOrganizer: { type: String },
  ticketId: { type: String },
  eventDate: { type: Date },
  totalAmount:{type:Number},
  numberOfSeats:{type:Number},
  UserId: {
    type: mongoose.Schema.ObjectId,
    required: true
  },
  isPaid:{
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("Order", orderSchema);
