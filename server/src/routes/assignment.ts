import { Router } from "express";
import { createAssignment } from "../controller/assignment-controller";
import { TeacherAuth } from "../middleware/teacher";
import { UserAuth } from "../middleware/user";

const router = Router();

router.post("/create", TeacherAuth, createAssignment);


export { router as AssignmentRoutes }