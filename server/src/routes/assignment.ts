import { Router } from "express";
import { createAssignment, getStudentsAssignment } from "../controller/assignment-controller";
import { TeacherAuth } from "../middleware/teacher";

const router = Router();

router.get("/", getStudentsAssignment);
router.post("/create", TeacherAuth, createAssignment);


export { router as AssignmentRoutes }