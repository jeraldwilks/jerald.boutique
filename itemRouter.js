import express from "express";
import { itemModel } from "./models.js";

export const itemRouter = express.Router();

itemRouter.post("/", async (req, res) => {
  const item = new itemModel(req.body);

  try {
    await item.save();
    res.send(item);
  } catch (error) {
    res.status(500).send(error);
  }
});
itemRouter.get("/", async (req, res) => {
  const items = await itemModel.find({});

  try {
    res.send(items);
  } catch (error) {
    res.status(500).send(error);
  }
});

// app.post("/add_user", async (request, response) => {
//     const user = new userModel(request.body);

//     try {
//       await user.save();
//       response.send(user);
//     } catch (error) {
//       response.status(500).send(error);
//     }
// });
