import express from "express";
import { getOrganiser } from "../controllers/organiserController.js";

const router = express.Router();
router.get("/:email", getOrganiser); // /:id is a parameter that will be filled in by the Express framework

export default router;
