import express from "express";
import path from "path";
import mongoose from "mongoose";
import dotenv from "dotenv";
import SwaggerUI from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import { itemRouter } from "./routes/itemRouter.js";
import { saleRouter } from "./routes/saleRouter.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT;
const dirname = path.resolve();

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "jerald.boutique",
      version: "0.4.0",
      description: "Project 1 - Simple Proof of Concept for Sales & Inventory",
    },
  },
  apis: ["./routes/*.js"],
};
if (process.env.SERVER === "dev") {
  options.servers = { url: "http://localhost:4000" };
} else if (process.env.SERVER === "production") {
  options.servers = { url: "https://jerald.boutique" };
}

const specs = swaggerJSDoc(options);

await mongoose.connect(process.env.MONGO_URL);
console.log("Connected to MongoDB");

app.use(express.json());

app.listen(PORT, () => console.log(`Listening on ${PORT}`));

app.get("/", (request, response) => {
  response.sendFile(dirname + "/readme.html");
});
app.get("/favicon.ico", (request, response) => {
  response.sendFile(dirname + "/favicon.ico");
});
app.get("/Project1.jpg", (request, response) => {
  response.sendFile(dirname + "/Project1.jpg");
});
app.use("/api-docs", SwaggerUI.serve, SwaggerUI.setup(specs));
app.use("/items", itemRouter);
app.use("/sales", saleRouter);
