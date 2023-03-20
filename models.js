import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
  createdOn: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
  sku: {
    type: Number,
    min: 100000,
    max: 999999,
    immutable: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
});

ItemSchema.methods.display = function () {
  return `SKU: ${this.sku}, Product Name: ${this.name}, Price: ${this.price}, Cost: ${this.cost}`;
};

export const itemModel = mongoose.model("Item", ItemSchema);

const SaleSchema = mongoose.Schema({
  transactionID: {
    type: Number,
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

const CounterSchema = mongoose.Schema({
  counterName: {
    type: String,
    required: true,
  },
  nextCount: {
    type: Number,
    required: true,
  },
});

export const counterModel = mongoose.model("Counter", CounterSchema);
