const { Schema, model } = require("mongoose");

const sellerWalletSchema = new Schema(
  {
    sellerId: {
      type: Schema.ObjectId,
      required: true
    },
    customerId: {
      type: Schema.ObjectId,
      required: true
    },
    eventId:{
      type: Schema.ObjectId,
      required: true  
    },
    transactionId: {
      type: String,
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    numberOfTickets: {
      type: Number,
      required: true
    },
  },
  { timestamps: true }
);


module.exports = model("sellerWallet", sellerWalletSchema);
