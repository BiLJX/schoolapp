import { Router } from "express";
import { Classes, getCurrentAdmin } from "../controller/admin-controller";

const router = Router();

router.get("/current", getCurrentAdmin);

router.get("/classes", Classes.getClasses)
router.put("/class", Classes.addClasses);
router.delete("/class/:id", Classes.removeClass)

export { router as AdminRoutes }