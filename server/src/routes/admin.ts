import { Router } from "express";
import { getCurrentAdmin } from "../controller/admin-controller";
import { addClasses, editClass, getClassById, getClasses, getClassStudents, removeClass } from "../controller/admin/admin-classes";
import * as AdminRequets from "../controller/admin/admin-requets";
import * as ManageUsers from "../controller/admin/manage-user"
const router = Router();

router.get("/current", getCurrentAdmin);

//classes
router.get("/classes", getClasses);
router.get("/classes/:class_id/students", getClassStudents);
router.get("/classes/:class_id/info", getClassById);
router.patch("/classes/:class_id/update", editClass);
router.put("/class", addClasses);
router.delete("/class/:class_id", removeClass);



//manage

router.get("/manage/students", ManageUsers.getAdminStudents);
router.get("/manage/teachers", ManageUsers.getAdminTeachers);

router.patch("/manage/teachers/update", ManageUsers.updateTeacher);
router.patch("/manage/students/update", ManageUsers.updateStudent);

router.post("/manage/students/create", ManageUsers.createStudent);
router.post("/manage/teachers/create", ManageUsers.createTeacher);

//req controls

router.get("/requests/students", AdminRequets.getStudentAccountRequests);
router.get("/requests/teachers", AdminRequets.getTeacherAccountRequests);

router.put("/requests/students/approve", AdminRequets.approveStudentAccount);
router.put("/requests/teachers/approve", AdminRequets.approveTeacherAccount);

router.delete("/requests/students/:user_id/reject", AdminRequets.rejectStudentAccount);
router.delete("/requests/teachers/:user_id/reject", AdminRequets.rejectTeacherAccount);
export { router as AdminRoutes }