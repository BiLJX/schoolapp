import { Router } from "express";
import { getCurrentUser, getStudentById, getStudentPerformance, getTeacherById } from "../controller/user-controller";

const router = Router();

router.get("/current", getCurrentUser);
router.get("/student/:user_id", getStudentById);
router.get("/student/:user_id/performance", getStudentPerformance)

router.get("/teacher/:user_id", getTeacherById);
export { router as UserRoutes }