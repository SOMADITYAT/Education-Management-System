
import express from "express";
import { registerUser, authUser } from "../controllers/userController.js"; // Import user controllers

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", authUser); 

export default router;
