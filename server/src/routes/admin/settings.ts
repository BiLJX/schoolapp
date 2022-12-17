import { Router } from "express";
import { changePassword, editSchool } from "../../controller/admin/admin-settings";
const router = Router();

router.patch("/settings/edit/school", editSchool);
router.patch("/settings/change/password", changePassword);

export { router as AdminSettingsRoutes }