import express from "express";
import { addPlan, getPlans } from "../controller/plans.js";


const planRouter = express.Router()

planRouter.route('/').get(getPlans).post(addPlan)

export default planRouter