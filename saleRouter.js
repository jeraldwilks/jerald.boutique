import express from "express";
import { saleModel } from "./models.js";

export const saleRouter = express.Router();

saleRouter.get("/", async (req, res) => {
  const sales = await saleModel.find();
  try {
    res.send(sales);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error);
  }
});

saleRouter.post("/", async (req, res) => {
  const sale = new saleModel(req.body);

  try {
    await sale.save();
    res.send(sale);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error);
  }
});
