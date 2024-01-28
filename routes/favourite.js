import express from "express";
import { getFavourite, setFavourite } from "../controllers/favController.js";

const router = express.Router();

router.get("/:id", getFavourite);
router.post("/", setFavourite);

export default router;