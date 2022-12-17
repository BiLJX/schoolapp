import { Router } from "express";
import { deleteNotice, getAdminNotices, getDashboard } from "../../controller/admin/admin-dashboard";
const router = Router();

router.get("/", getDashboard);
router.get("/notices", getAdminNotices);
router.delete("/notices/:id/delete", deleteNotice);

export { router as AdminDashboardRotues }