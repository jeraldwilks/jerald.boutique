import express from "express";
import { itemModel, saleModel, counterModel } from "../models.js";

export const saleRouter = express.Router();
saleRouter.get("/", async (req, res) => {
  try {
    let toFind = await findObjects(req);
    console.log(toFind);
    const sales = await saleModel.find(toFind).populate("itemsSold");
    res.send(sales);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error);
  }
});

saleRouter.post("/", async (req, res) => {
  try {
    const counter = await counterModel.findOne({ counterName: "sales" });
    let transactionID = counter.nextCount;
    counter.nextCount = transactionID + 1;
    const sale = new saleModel();
    sale.transactionID = transactionID;
    sale.itemsSold = await findObjectIDs(req.query.itemsSold);
    await counter.save();
    await sale.save();
    res.send(
      await saleModel
        .findOne({ transactionID: sale.transactionID })
        .populate("itemsSold")
    );
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error);
  }
});

saleRouter.patch("/", async (req, res) => {
  try {
    let objectIDs = await findObjectIDs(req.query.itemsSold);
    console.log("objectedIDs: ", objectIDs);
    const sale = await saleModel.findOneAndUpdate(
      { transactionID: req.query.transactionID },
      { itemsSold: objectIDs },
      {
        new: true,
      }
    );
    await sale.save();
    res.send(
      await saleModel
        .findOne({ transactionID: sale.transactionID })
        .populate("itemsSold")
    );
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

async function findObjects(req) {
  let toFind = {};
  if (req.query.itemsSold) {
    toFind = {
      itemsSold: { $all: await findObjectIDs(req.query.itemsSold) },
    };
  }
  if (req.query.transactionID) {
    toFind.transactionID = req.query.transactionID;
  }
  return toFind;
}

async function findObjectIDs(searchSkus) {
  let objectIDs = [];
  if (typeof searchSkus === "object") {
    for (let searchSku of searchSkus) {
      let searchJSON = {
        sku: parseInt(searchSku),
      };
      let item = await itemModel.findOne(searchJSON);
      objectIDs.push(item._id);
    }
  } else {
    let searchJSON = {
      sku: parseInt(searchSkus),
    };
    let item = await itemModel.findOne(searchJSON);
    objectIDs.push(item._id);
  }
  return objectIDs;
}

/**
 * @swagger
 * components:
 *  schemas:
 *    Sale:
 *      type: object
 *      required:
 *        - itemsSold
 *      properties:
 *        createdOn:
 *          type: date
 *          description: auto-generated date, immutable
 *        transactionID:
 *          type: number
 *          description: tracking number auto-generated, immutable
 *        itemsSold:
 *          type: objectID
 *          description: array of objectIDs of sold items
 *      example:
 *        _id: 64135b6be67e48624342393f
 *        createdOn: 2023-03-16T18:09:47.254Z
 *        transactionID: 12345
 *        itemsSold: [64135b6be67e48624342393f,64135b6be67e48624342393f]
 */
/**
 * @swagger
 * tags:
 *  name: Sales
 *  description: The Sales managing API
 */
/**
 * @swagger
 * /sales:
 *  get:
 *    parameters:
 *      - in: query
 *        name: transactionID
 *        schema:
 *          type: number
 *        description: transactionID
 *      - in: query
 *        name: itemsSold
 *        schema:
 *          type: array
 *          collectionFormat: csv
 *          items:
 *            type: number
 *          minItems: 1
 *        description: Input zero, one or many SKUs to search by
 *    summary: Returns array of all the matching Sales. Accepts zero or many parameters
 *    tags: [Sales]
 *    responses:
 *      200:
 *        description: Array of all matching Sales
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Sale'
 *      500:
 *        description: Server error
 *  post:
 *    summary: Adds Sale item from array of SKUs sold
 *    tags: [Sales]
 *    parameters:
 *      - in: query
 *        name: itemsSold
 *        schema:
 *          type: array
 *          collectionFormat: csv
 *          items:
 *            type: number
 *        required: true
 *        description: Input one or many SKUs sold
 *    responses:
 *      200:
 *        description: Returns new Sale object
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Sale'
 *      500:
 *        description: Server error
 *  patch:
 *    summary: Finds by transactionID and updates with skus
 *    tags: [Sales]
 *    parameters:
 *      - in: query
 *        name: transactionID
 *        schema:
 *          type: number
 *        required: true
 *        description: transactionID of object to be updated
 *      - in: query
 *        name: itemsSold
 *        schema:
 *          type: array
 *          collectionFormat: csv
 *          items:
 *            type: number
 *        required: true
 *        description: Input one or many SKUs sold; will replace previous entries
 *    responses:
 *      200:
 *        description: Returns updated Sale object
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Sale'
 *      500:
 *        description: Server error
 */
