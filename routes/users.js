import express from "express";
import { getUser, setUser } from "../controllers/userController.js";

const router = express.Router();

router.get("/:id", getUser);
router.post("/", setUser);

export default router;