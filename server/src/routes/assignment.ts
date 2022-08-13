import { Router } from "express";
import { createAssignment, deleteAssignment, getAssignedStudents, getAssignmentById, getGivenAssignments, getPendingStudents, getRedoStudents, getStudentsAssignment, getSubmittedStudents, redoAssignment, submitAssignment } from "../controller/assignment-controller";
import { TeacherAuth } from "../middleware/teacher";

const router = Router();

router.get("/", getStudentsAssignment);
router.get("/given", TeacherAuth, getGivenAssignments);
router.get("/:id/assigned", TeacherAuth, getAssignedStudents);
router.get("/:id", getAssignmentById);
router.get("/:id/submitted", getSubmittedStudents);
router.get("/:id/pending", getPendingStudents);
router.get("/:id/redo", getRedoStudents);

router.put("/:id/submit", TeacherAuth, submitAssignment);
router.put("/:id/redo", TeacherAuth, redoAssignment)
router.post("/create", TeacherAuth, createAssignment);

router.delete("/:id/delete", TeacherAuth, deleteAssignment);
export { router as AssignmentRoutes }