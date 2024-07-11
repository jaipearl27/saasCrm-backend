import express from "express";
import { addAttendees, deleteCsvData, getAttendees, getCsvData } from "../controller/attendees/attendees.js";

const attendeesRouter = express.Router();
attendeesRouter.route("/").post(addAttendees);
attendeesRouter.route("/:page?").get(getAttendees).post(getAttendees);
attendeesRouter.route("/csvData/:page?").get(getCsvData)
attendeesRouter.route("/:csvId").delete(deleteCsvData)


export default attendeesRouter;
