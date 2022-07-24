import { Router } from "express";
import { getCurrentUser, getStudentById, getTeacherById } from "../controller/user-controller";

const router = Router();

router.get("/current", getCurrentUser);
router.get("/student/:user_id", getStudentById);
router.get("/teacher/:user_id", getTeacherById);

export { router as UserRoutes }