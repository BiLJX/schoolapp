import { Router } from "express";
import { Classes, getCurrentAdmin, AdminUser } from "../controller/admin-controller";

const router = Router();

router.get("/current", getCurrentAdmin);

//classes
router.get("/classes", Classes.getClasses)
router.put("/class", Classes.addClasses);
router.delete("/class/:class_id", Classes.removeClass)

//user controls
router.get("/requests/students", AdminUser.getStudentAccountRequests)
router.put("/requests/students/:user_id/approve", AdminUser.approveStudentAccount)
router.delete("/requests/students/:user_id/reject", AdminUser.rejectStudentAccount)

export { router as AdminRoutes }