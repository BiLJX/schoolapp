import { Router } from "express";
import { createAssignment, getAssignmentById, getStudentsAssignment } from "../controller/assignment-controller";
import { TeacherAuth } from "../middleware/teacher";

const router = Router();

router.get("/", getStudentsAssignment);
router.get("/:id", getAssignmentById);


router.post("/create", TeacherAuth, createAssignment);


export { router as AssignmentRoutes }