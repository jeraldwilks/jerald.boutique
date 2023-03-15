import express from "express";
import path from "path";
import mongoose from "mongoose";
import dotenv from "dotenv";
// import { db } from "./mongoConnect.js";
import { itemRouter } from "./itemRouter.js";
import { itemModel } from "./models.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT;
const dirname = path.resolve();

mongoose.connect(process.env.MONGO_URL);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () => {
  console.log("Connected to MongoDB successfully");
});

app.use(express.json());

app.listen(PORT, () => console.log(`Listening on ${PORT}`));

app.get("/", (request, response) => {
  response.sendFile(dirname + "/readme.html");
});
app.get("/favicon.ico", (request, response) => {
  response.sendFile(dirname + "/favicon.ico");
});

app.use("/items", itemRouter);
