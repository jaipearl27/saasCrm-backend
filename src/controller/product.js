
import { productModel } from "../models/products.js";
import { asyncHandler } from "../utils/errorHandler/asyncHandler.js";

export const addProduct = asyncHandler(async (req, res) => {
  await productModel.create(req?.body);
  res.status(200).send("Product Created Successfully");
});


export const getProducts = asyncHandler(async (req, res) => {
    const {id}= req?.params
  const data = await productModel.find();
  res.status(200).json({ status: true, data });
});
