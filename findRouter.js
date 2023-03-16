import express from "express";
import { saleModel } from "./models.js";
import { itemModel } from "./models.js";

export const findRouter = express.Router();

findRouter.post("/", async (req, res) => {
  let result;
  //   console.log(req.body.request);
  if (req.body.requestType === "sale") {
    result = await saleModel.find(req.body.request);
  }
  if (req.body.requestType === "item") {
    result = await itemModel.find(req.body.request);
  }
  try {
    res.send(result);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error);
  }
  console.log(req.body.transactionID);
});
