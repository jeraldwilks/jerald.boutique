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

saleRouter.patch("/", async (req, res) => {
  try {
    const sale = await saleModel.findOneAndUpdate(
      req.body.find,
      req.body.update,
      {
        new: true,
      }
    );
    await sale.save();
    res.send(sale);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});
