import express from "express";
import {
  getEventByDepartment,
  getEventByName,
  deleteEvent,
  getAllEvents,
} from "../controllers/eventController";

const router = express.Router();
router.get(":/department_event", getEventByDepartment);
router.get(":/name_event", getEventByName);
router.get(":/events", getAllEvents);
router.post("/", deleteEvent);

export default router;
