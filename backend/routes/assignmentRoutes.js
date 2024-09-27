import express from "express";
import { submitAssignment } from "../controllers/assignmentController.js";

const router = express.Router();

router.post("/:studentId/submit", submitAssignment);

export default router;
