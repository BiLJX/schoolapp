import { Router } from "express";
import * as ManageUsers from "../../controller/admin/manage-user"
const router = Router();

router.get("/students", ManageUsers.getAdminStudents);
router.get("/teachers", ManageUsers.getAdminTeachers);

router.patch("/teachers/update", ManageUsers.updateTeacher);
router.patch("/students/update", ManageUsers.updateStudent);

router.post("/students/create", ManageUsers.createStudent);
router.post("/teachers/create", ManageUsers.createTeacher);

export { router as ManageUsersRoute }