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
      version: "0.3.0",
      description: "Project 1 - Simple Proof of Concept for Sales & Inventory",
    },
    servers: [
      {
        url: "http://localhost:4000",
      },
      {
        url: "https://jerald.boutique",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

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
// app.use("/find", findRouter);
