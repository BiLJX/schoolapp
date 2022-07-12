import { Router } from "express";
import { getCurrentAdmin } from "../controller/admin-controller";

const router = Router();

router.get("/current", getCurrentAdmin)

export { router as AdminRoutes }