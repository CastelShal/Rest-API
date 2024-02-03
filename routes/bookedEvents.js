import express from "express";
import {
  getBookedEvents,
  setBookedEvents,
} from "../controllers/bookedEventsController.js";

const router = express.Router();

router.get("/:id", getBookedEvents);
router.post("/", setBookedEvents);

export default router;
