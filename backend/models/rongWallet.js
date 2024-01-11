const { Schema, model } = require("mongoose");

const RongWalletSchema = new Schema(
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
      type: Schema.ObjectId,
      required: true
    },
    totalAmount: {
      type: Number,
      required: true
    },
    platformCharge:{
        type:Number,
        required:true
    },
    numberOfTickets: {
      type: Number,
      required: true
    },
  },
  { timestamps: true }
);


module.exports = model("rongWallet", RongWalletSchema);
