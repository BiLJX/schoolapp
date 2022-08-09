import { Router } from "express";
import { createAssignment, getAssignedStudents, getAssignmentById, getGivenAssignments, getStudentsAssignment } from "../controller/assignment-controller";
import { TeacherAuth } from "../middleware/teacher";

const router = Router();

router.get("/", getStudentsAssignment);
router.get("/given", TeacherAuth, getGivenAssignments);
router.get("/:id/assigned", TeacherAuth, getAssignedStudents);
router.get("/:id", getAssignmentById);


router.post("/create", TeacherAuth, createAssignment);


export { router as AssignmentRoutes }