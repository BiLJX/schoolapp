import { Router } from "express";
import { getCurrentUser, getStudentById, getStudentDemeritsPerformance, getStudentMDOverall, getStudentMeritsPerformance, getTeacherById } from "../controller/user-controller";

const router = Router();

router.get("/current", getCurrentUser);
router.get("/student/:user_id", getStudentById);
router.get("/student/:user_id/performance/merits", getStudentMeritsPerformance);
router.get("/student/:user_id/performance/demerits", getStudentDemeritsPerformance);
router.get("/student/:user_id/performance/overall/md", getStudentMDOverall);
router.get("/teacher/:user_id", getTeacherById);
export { router as UserRoutes }