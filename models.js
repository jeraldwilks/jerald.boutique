import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
  sku: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    default: 0,
  },
  price: {
    type: Number,
  },
  cost: {
    type: Number,
  },
});

export const itemModel = mongoose.model("Item", ItemSchema);
