import express from "express";
import { addAttendees } from "../controller/attendees.js";

const attendeesRouter = express.Router();
attendeesRouter.route("/add").post(addAttendees);


export default attendeesRouter;
