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
  UserId: {
    type: mongoose.Schema.ObjectId,
    required: true,
  },
});

module.exports = mongoose.model("Order", orderSchema);
