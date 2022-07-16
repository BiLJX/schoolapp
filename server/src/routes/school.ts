import { Router } from "express";
import { getClasses, getSchools } from "../controller/school-controller";

const router = Router();

router.get("/", getSchools)
router.get("/:school_id/classes", getClasses)
export { router as SchoolRoutes }