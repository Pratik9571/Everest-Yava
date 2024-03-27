import express from "express";
import {
  isBuyer,
  isSeller,
  isUser,
} from "../middleware/authentication.middleware.js";
import { addProductValidationSchema } from "./product.validation.js";
import { checkMongoIdValidityFromParams } from "../middleware/mongo.id.validity.middleware.js";
import Product from "./product.model.js";
import { paginationValidationSchema } from "../utils/pagination.validation.js";

const router = express.Router();

//! add product, system user, role == seller
router.post(
  "/product/add",
  isSeller,
  async (req, res, next) => {
    const newProduct = req.body;
    try {
      const validatedData = await addProductValidationSchema.validate(
        newProduct
      );
      req.body = validatedData;
      next();
    } catch (error) {
      return res.status(400).send({ message: error.message });
    }
  },
  async (req, res) => {
    const newProduct = req.body;
    //   add seller id
    newProduct.sellerId = req.loggedInUserId;
    //   create product
    await Product.create(newProduct);
    return res.status(200).send({ message: "Product is added Successfully." });
  }
);

//! get product details
router.get(
  "/product/details/:id",
  isUser,
  checkMongoIdValidityFromParams,
  async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findOne({ _id: productId });

    if (!product) {
      return res.status(404).send({ message: "Product does not exists." });
    }

    return res.status(200).send({
      message: "Here's the product details.",
      productDetails: product,
    });
  }
);

//! delete product
router.delete(
  "/product/delete/:id",
  isSeller,
  checkMongoIdValidityFromParams,
  async (req, res) => {
    const productId = req.params.id;

    const product = await Product.findOne({ _id: productId });

    if (!product) {
      return res.status(404).send({ message: "Product doesn't exists." });
    }
    // check for owner of product
    // loggedInUserId must be same with product's sellerId

    const isOwnerOfProduct =
      String(product.sellerId) == String(req.loggedInUserId);

    if (!isOwnerOfProduct) {
      return res
        .status(403)
        .send({ message: "You are not the owner of this product." });
    }
    await Product.deleteOne({ _id: productId });
    return res.status(200).send({ message: "Product is deleted sucessfully." });
  }
);

//! TO edit product details
router.put(
  "/product/edit/:id",
  isSeller,
  checkMongoIdValidityFromParams,
  async (req, res, next) => {
    const newProduct = req.body;
    try {
      const validatedData = await addProductValidationSchema.validate(
        newProduct
      );
      req.body = validatedData;
      next();
    } catch (error) {
      return res.status(400).send({ message: error.message });
    }
  },
  async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findOne({ _id: productId });

    if (!product) {
      return res.status(404).send({ message: "Product doesn't exists." });
    }
    const isOwnerOfProduct = product.sellerId.equals(req.loggedInUserId);

    if (!isOwnerOfProduct) {
      return res
        .status(403)
        .send({ message: "You're not the owner of this product." });
    }
    const newValues = req.body;
    await Product.updateOne({ _id: productId }, { $set: { ...newValues } });

    return res
      .status(200)
      .send({ message: "Product is updated successfully." });
  }
);

//! get product list for buyer
router.post(
  "/product/list/buyer",
  isBuyer,
  async (req, res, next) => {
    const paginationData = req.body;
    try {
      const validatedData = await paginationValidationSchema.validate(
        paginationData
      );
      req.body = validatedData;
      next();
    } catch (error) {
      return res.status(400).send({ message: error.message });
    }
  },
  async (req, res) => {
    // extract pagination data from req.body
    const { page, limit } = req.body;
    // calculate skip
    const skip = (page - 1) * limit;
    // run query
    const productList = await Product.aggregate([
      { $match: {} },
      { $skip: skip },
      { $limit: limit },
      {
        $project: {
          name: 1,
          brand: 1,
          price: 1,
          category: 1,
          description: { $substr: ["$description", 0, 190] },
          planningTo: 1,
          image: 1,
        },
      },
    ]);

    const totalProducts = await Product.find().countDocuments();
    const numberOfPages = Math.ceil(totalProducts / limit);

    return res
      .status(200)
      .send({ message: "Success", productList: productList, numberOfPages });
  }
);

//! get product list by seller
router.post(
  "/product/list/seller",
  isSeller,
  async (req, res, next) => {
    const paginationData = req.body;
    try {
      const validatedData = await paginationValidationSchema.validate(
        paginationData
      );
      req.body = validatedData;
      next();
    } catch (error) {
      return res.status(401).send({ message: error.message });
    }
  },
  async (req, res) => {
    const paginationData = req.body;

    const skip = (paginationData.page - 1) * paginationData.limit;

    const productList = await Product.aggregate([
      { $match: { sellerId: req.loggedInUserId } },
      { $skip: skip },
      { $limit: paginationData.limit },
      {
        $project: {
          name: 1,
          brand: 1,
          price: 1,
          category: 1,
          description: { $substr: ["$description", 0, 190] },
          planningTo: 1,
          image: 1,
        },
      },
    ]);
    return res
      .status(200)
      .send({ message: "Success", productList: productList });
  }
);

export default router;
