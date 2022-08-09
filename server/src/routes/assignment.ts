import { Router } from "express";
import { createAssignment, getAssignedStudents, getAssignmentById, getGivenAssignments, getStudentsAssignment, redoAssignment, submitAssignment } from "../controller/assignment-controller";
import { TeacherAuth } from "../middleware/teacher";

const router = Router();

router.get("/", getStudentsAssignment);
router.get("/given", TeacherAuth, getGivenAssignments);
router.get("/:id/assigned", TeacherAuth, getAssignedStudents);
router.get("/:id", getAssignmentById);


router.put("/:id/submit", TeacherAuth, submitAssignment);
router.put("/:id/redo", TeacherAuth, redoAssignment)
router.post("/create", TeacherAuth, createAssignment);


export { router as AssignmentRoutes }