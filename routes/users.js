import express from "express";
import { getUser, login, newOtp, setUser, signUp, verifyOTP } from "../controllers/userController.js";
import { fetchUser } from "../middleware/userMw.js";

const router = express.Router();

router.get("/:id", getUser);
router.get("/newotp/:id", fetchUser, newOtp);
router.post("/", setUser);
router.post("/signup", signUp);
router.post("/otpcheck", fetchUser, verifyOTP);
router.post("/login", fetchUser, login);

export default router;