import express from "express";
import { addAttendees, getAllAttendees, getCsvData } from "../controller/attendees.js";

const attendeesRouter = express.Router();
attendeesRouter.route("/").get(getAllAttendees).post(addAttendees);
attendeesRouter.route("/csvData").get(getCsvData)


export default attendeesRouter;
