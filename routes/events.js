import express from "express";
import {
  getEventByDepartment,
  getEventByName,
  deleteEvent,
  getAllEvents,
} from "../controllers/eventController.js";

const router = express.Router();
router.get("/:department_event", getEventByDepartment);
router.get("/:name_event", getEventByName);
router.get("/events", getAllEvents);
router.delete("/", deleteEvent);

export default router;
