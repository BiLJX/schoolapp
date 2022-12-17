import { Router } from "express";
const router = Router();
import { getCurrentAdmin } from "../controller/admin-controller";
import * as AdminRequets from "../controller/admin/admin-requets";
import { AdminClassesRoute } from "./admin/classes";
import { AdminDashboardRotues } from "./admin/dashboard";
import { AdminSettingsRoutes } from "./admin/settings";
import { ManageUsersRoute } from "./admin/users";

router.get("/current", getCurrentAdmin);
router.use("/classes", AdminClassesRoute);
router.use("/manage", ManageUsersRoute);
router.use("/dashboard", AdminDashboardRotues);
router.use("/settings", AdminSettingsRoutes);


router.get("/requests/students", AdminRequets.getStudentAccountRequests);
router.get("/requests/teachers", AdminRequets.getTeacherAccountRequests);

router.put("/requests/students/approve", AdminRequets.approveStudentAccount);
router.put("/requests/teachers/approve", AdminRequets.approveTeacherAccount);

router.delete("/requests/students/:user_id/reject", AdminRequets.rejectStudentAccount);
router.delete("/requests/teachers/:user_id/reject", AdminRequets.rejectTeacherAccount);



export { router as AdminRoutes }