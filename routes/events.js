import express from "express";
import {
  getEventByDepartment,
  getEventByName,
  deleteEvent,
  getAllEvents,
  setEvent
} from "../controllers/eventController.js";

const router = express.Router();
router.get("/bydept/:department", getEventByDepartment);
router.get("/byevent/:eventName", getEventByName);
router.get("/", getAllEvents);
router.delete("/:eventName", deleteEvent);
router.post("/" , setEvent);

export default router;
