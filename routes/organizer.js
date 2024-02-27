import express from "express";
import { getAllOrgs, getOrganizer, login } from "../controllers/organizerController.js";

const router = express.Router();
router.get("/getAll", getAllOrgs);
router.get("/:email", getOrganizer);
router.post("/", login);

export default router;
