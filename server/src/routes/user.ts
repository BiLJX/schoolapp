import { Router } from "express";
import { getStudentDemeritsPerformance, getStudentMDOverall, getStudentMeritsPerformance, getStudentsAssignmentPerformance } from "../controller/student-performance-controller";
import { getCurrentUser, getStudentById, getTeacherById } from "../controller/user-controller";

const router = Router();

router.get("/current", getCurrentUser);
router.get("/student/:user_id", getStudentById);


router.get("/student/:user_id/performance/merits", getStudentMeritsPerformance);
router.get("/student/:user_id/performance/demerits", getStudentDemeritsPerformance);
router.get("/student/:user_id/performance/overall/md", getStudentMDOverall);
router.get("/student/:user_id/performance/overall/assignment", getStudentsAssignmentPerformance);

router.get("/teacher/:user_id", getTeacherById);
export { router as UserRoutes }