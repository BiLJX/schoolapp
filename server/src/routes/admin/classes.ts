import { Router } from "express";
import { addClasses, addStudent, editClass, getClassById, getClasses, getClassStudents, removeClass } from "../../controller/admin/admin-classes";

const router = Router();

router.get("/", getClasses);
router.get("/:class_id/students", getClassStudents);
router.get("/:class_id/info", getClassById);
router.patch("/:class_id/update", editClass);
router.put("/", addClasses);
router.put("/student/add", addStudent)
router.delete("/:class_id", removeClass);

export {router as AdminClassesRoute}