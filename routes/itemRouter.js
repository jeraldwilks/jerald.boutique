import express from "express";
import { itemModel } from "../models.js";
import { counterModel } from "../models.js";

export const itemRouter = express.Router();

itemRouter.get("/", async (req, res) => {
  let toFind = findObjects(req);
  const items = await itemModel.find(toFind);
  try {
    res.send(items);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error);
  }
});

itemRouter.post("/", async (req, res) => {
  const counter = await counterModel.findOne({ counterName: "items" });
  let sku = counter.nextCount;
  counter.nextCount = sku + 1;
  const item = new itemModel();
  item.sku = sku;
  item.name = req.query.name;
  item.price = req.query.price;
  item.cost = req.query.cost;
  item.quantity = req.query.quantity;
  try {
    await item.save();
    await counter.save();
    res.send(item);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
});

itemRouter.patch("/", async (req, res) => {
  try {
    let toUpdate = {};
    if (req.query.name) {
      toUpdate.name = req.query.name;
    }
    if (req.query.price) {
      toUpdate.price = req.query.price;
    }
    if (req.query.cost) {
      toUpdate.cost = req.query.cost;
    }
    if (req.query.quantity) {
      toUpdate.quantity = req.query.quantity;
    }
    const item = await itemModel.findOneAndUpdate(
      { sku: req.query.sku },
      toUpdate,
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

function findObjects(req) {
  let toFind = {};
  if (req.query.sku) {
    toFind.sku = req.query.sku;
  }
  if (req.query.price) {
    toFind.price = req.query.price;
  }
  if (req.query.cost) {
    toFind.cost = req.query.cost;
  }
  if (req.query.name) {
    toFind.name = req.query.name;
  }
  if (req.query.id) {
    toFind._id = req.query.id;
  }
  return toFind;
}
/**
 * @swagger
 * components:
 *  schemas:
 *    Item:
 *      type: object
 *      required:
 *        - name
 *        - price
 *        - cost
 *      properties:
 *        id:
 *          type: string
 *          description: auto-generated objectID, immutable
 *        createdOn:
 *          type: date
 *          description: auto-generated date, immutable
 *        sku:
 *          type: number
 *          description: item sku; auto-generated, immutable
 *        name:
 *          type: string
 *          description: item name
 *        price:
 *          type: number
 *          description: retail sale price
 *        cost:
 *          type: number
 *          description: cost for wholesale purchase
 *        quantity:
 *          type: number
 *          description: quantity of item in stock
 *
 *      example:
 *        _id: 64135b6be67e48624342393f
 *        createdOn: 2023-03-16T18:09:47.254Z
 *        sku: 123456
 *        name: widgets
 *        price: 55.55
 *        cost: 33.33
 *        quantity: 45
 *
 */
/**
 * @swagger
 * tags:
 *  name: Items
 *  description: The Items managing API
 */
/**
 * @swagger
 * /items:
 *  get:
 *    parameters:
 *      - in: query
 *        name: id
 *        schema:
 *          type: string
 *        description: ObjectID assigned by MongoDB
 *      - in: query
 *        name: sku
 *        schema:
 *          type: number
 *        description: Must be between 100000-999999
 *      - in: query
 *        name: name
 *        schema:
 *          type: string
 *        description: Name of item
 *      - in: query
 *        name: price
 *        schema:
 *          type: number
 *        description: Retail price of item
 *      - in: query
 *        name: cost
 *        schema:
 *          type: number
 *        description: Wholesale cost of item
 *    summary: Returns array of all the matching Items. Accepts zero or many parameters
 *    tags: [Items]
 *    responses:
 *      200:
 *        description: Array of all matching Items
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Item'
 *      500:
 *        description: Server error
 *
 *  post:
 *    summary: Create a new item
 *    tags: [Items]
 *    parameters:
 *      - in: query
 *        name: name
 *        schema:
 *          type: string
 *        required: true
 *        description: Name of item
 *      - in: query
 *        name: price
 *        schema:
 *          type: number
 *        required: true
 *        description: Retail price of item
 *      - in: query
 *        name: cost
 *        schema:
 *          type: number
 *        required: true
 *        description: Wholesale cost of item
 *      - in: query
 *        name: quantity
 *        schema:
 *          type: number
 *        description: Quantity of item
 *    responses:
 *      200:
 *       description: The item was successfully created, returns new object
 *       content:
 *         applications/json:
 *            schema:
 *              $ref: '#components/schemas/Item'
 *      500:
 *        description: Server error
 *  patch:
 *    summary: Search and find by sku, update one or many of name, price, cost or quantity
 *    tags: [Items]
 *    parameters:
 *      - in: query
 *        name: sku
 *        schema:
 *          type: number
 *        required: true
 *        description: Must be between 100000-999999
 *      - in: query
 *        name: name
 *        schema:
 *          type: string
 *        description: Name of item
 *      - in: query
 *        name: price
 *        schema:
 *          type: number
 *        description: Retail price of item
 *      - in: query
 *        name: cost
 *        schema:
 *          type: number
 *        description: Wholesale cost of item
 *      - in: query
 *        name: quantity
 *        schema:
 *          type: number
 *        description: Updated quantity of item
 *    requestBody:
 *      description: Only name, price, cost & quantity can be modified, all other fields are immutable.
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Item'
 *    responses:
 *      200:
 *       description: The item was successfully created, returns updated object
 *       content:
 *         applications/json:
 *            schema:
 *              $ref: '#components/schemas/Item'
 *      500:
 *        description: Server error
 */
