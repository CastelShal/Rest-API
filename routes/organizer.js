import express from "express";
import { getAllOrgs, getOrganizer } from "../controllers/organizerController.js";

const router = express.Router();
router.get("/getAll", getAllOrgs);
router.get("/:email", getOrganizer);

export default router;
