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
  cost: Number,
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
});

ItemSchema.methods.display = function () {
  return `SKU: ${this.sku}, Product Name: ${this.name}, Price: ${this.price}, Cost: ${this.cost}`;
};

export const itemModel = mongoose.model("Item", ItemSchema);
