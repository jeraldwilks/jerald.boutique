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
  createdOn: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
});

ItemSchema.methods.display = function () {
  return `SKU: ${this.sku}, Product Name: ${this.name}, Price: ${this.price}, Cost: ${this.cost}`;
};

export const itemModel = mongoose.model("Item", ItemSchema);

const SaleSchema = mongoose.Schema({
  transactionID: {
    type: Number,
    min: 1,
    max: 999999,
    required: true,
  },
  itemsSold: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
      required: true,
    },
  ],

  createdOn: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
});

export const saleModel = mongoose.model("Sale", SaleSchema);
