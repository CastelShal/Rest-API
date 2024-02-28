import express from "express";
import {
  getEventByDepartment,
  getEventByName,
  deleteEvent,
  getAllEvents,
  setEvent,
  updateEvent,
  downloadLogs
} from "../controllers/eventController.js";

const router = express.Router();
router.get("/bydept/:department", getEventByDepartment);
router.get("/byevent/:eventName", getEventByName);
router.get("/", getAllEvents);
router.get("/getlogs/:id", downloadLogs);
router.delete("/:eventName", deleteEvent);
router.post("/" , setEvent);
router.put("/", updateEvent);

export default router;
