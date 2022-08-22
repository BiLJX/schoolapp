import { Router } from "express";
import { Classes, getCurrentAdmin, AdminUser } from "../controller/admin-controller";

const router = Router();

router.get("/current", getCurrentAdmin);

//classes
router.get("/classes", Classes.getClasses)
router.put("/class", Classes.addClasses);
router.delete("/class/:class_id", Classes.removeClass)

//req controls
router.get("/requests/students", AdminUser.getStudentAccountRequests)
router.get("/requests/teachers", AdminUser.getTeacherAccountRequests)

router.put("/requests/students/approve", AdminUser.approveStudentAccount)
router.put("/requests/teachers/approve", AdminUser.approveTeacherAccount)

router.delete("/requests/students/:user_id/reject", AdminUser.rejectStudentAccount)
router.delete("/requests/teachers/:user_id/reject", AdminUser.rejectTeacherAccount);
export { router as AdminRoutes }