import { Router } from "express";
import { Classes, getCurrentAdmin } from "../controller/admin-controller";
import * as AdminRequets from "../controller/admin/admin-requets";
import * as ManageUsers from "../controller/admin/manage-user"
const router = Router();

router.get("/current", getCurrentAdmin);

//classes
router.get("/classes", Classes.getClasses)
router.put("/class", Classes.addClasses);
router.delete("/class/:class_id", Classes.removeClass)

//req controls

//manage
router.get("/manage/students", ManageUsers.getAdminStudents);
router.get("/manage/teachers", ManageUsers.getAdminTeachers);

router.get("/requests/students", AdminRequets.getStudentAccountRequests)
router.get("/requests/teachers", AdminRequets.getTeacherAccountRequests)

router.put("/requests/students/approve", AdminRequets.approveStudentAccount)
router.put("/requests/teachers/approve", AdminRequets.approveTeacherAccount)

router.patch("/manage/teachers/update", ManageUsers.updateTeacher)
router.patch("/manage/students/update", ManageUsers.updateStudent)
router.delete("/requests/students/:user_id/reject", AdminRequets.rejectStudentAccount)
router.delete("/requests/teachers/:user_id/reject", AdminRequets.rejectTeacherAccount);
export { router as AdminRoutes }