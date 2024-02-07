import express from "express";
import { getOrganizer } from "../controllers/organiserController.js";

const router = express.Router();
router.get(":/email", getOrganizer); // /:id is a parameter that will be filled in by the Express framework

export default router;
