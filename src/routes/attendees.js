import express from "express";
import { addAttendees, deleteCsvData, getAttendees, getCsvData } from "../controller/attendees.js";

const attendeesRouter = express.Router();
attendeesRouter.route("/:page?").get(getAttendees).post(addAttendees);
attendeesRouter.route("/csvData/:page?").get(getCsvData)
attendeesRouter.route("/:csvId").delete(deleteCsvData)


export default attendeesRouter;
