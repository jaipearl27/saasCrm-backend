import express from "express";
import { addAttendees, getAllAttendees } from "../controller/attendees.js";

const attendeesRouter = express.Router();
attendeesRouter.route("/").get(getAllAttendees).post(addAttendees);



export default attendeesRouter;
