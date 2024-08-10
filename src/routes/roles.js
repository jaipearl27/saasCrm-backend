import express from "express";
import { addRole, getRoles } from "../controller/roles/roles.js";


const roleRouter = express.Router()

roleRouter.route('/').get(getRoles)

export default roleRouter