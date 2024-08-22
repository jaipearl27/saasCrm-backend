import usersModel from "../models/users.js";
import { asyncHandler } from "../utils/errorHandler/asyncHandler.js";


export const getAllUsers = asyncHandler(async (req, res) => {
    const result = await usersModel.find()
    res.status(200).send(result)
})