import express from "express";
import { itemModel } from "./models.js";

export const itemRouter = express.Router();

itemRouter.get("/", async (req, res) => {
  const items = await itemModel.find();
  // let tempStr = "";
  // let toSend = "";
  // for (let each of items) {
  //   tempStr = toSend.concat(each.display(), "\n");
  //   toSend = tempStr;
  //   console.log(toSend);
  //   console.log(each.display());
  // }
  try {
    res.send(items);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error);
  }
});

itemRouter.post("/", async (req, res) => {
  const item = new itemModel(req.body);

  try {
    await item.save();
    res.send(item);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
});

itemRouter.patch("/", async (req, res) => {
  try {
    const item = await itemModel.findOneAndUpdate(
      req.body.find,
      req.body.update,
      {
        new: true,
      }
    );
    await item.save();
    res.send(item);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});
