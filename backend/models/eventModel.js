const { Schema, model } = require("mongoose");

const eventSchema = new Schema(
  {
    sellerId: {
      type: Schema.ObjectId,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    category: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },
    orgName: {
      type: String,
      required: true,
    },
    images: {
      type: Array,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

eventSchema.index(
  {
    name: "text",
    category: "text",
    description: "text",
  },
  {
    weights: {
      name: 5,
      category: 4,
      description: 2,
    },
  }
);

module.exports = model("events", eventSchema);
