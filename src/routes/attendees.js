import express from "express";
import { addAttendees, deleteCsvData, getAllAttendees, getCsvData } from "../controller/attendees.js";

const attendeesRouter = express.Router();
attendeesRouter.route("/").get(getAllAttendees).post(addAttendees);
attendeesRouter.route("/csvData/:page").get(getCsvData)
attendeesRouter.route("/:csvId").delete(deleteCsvData)


export default attendeesRouter;
