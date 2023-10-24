const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  eventTitle: { type: String, required: true },
  eventOrganizer: { type: String },
  ticketId: { type: String },
  eventDate: { type: Date },
});


module.exports=mongoose.model("Order",orderSchema)