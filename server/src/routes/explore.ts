import { Router } from "express";
import { getTopStudents, searchExplore } from "../controller/explore-controller";
import { UserAuth } from "../middleware/user";
const router = Router();

router.get("/top", getTopStudents);
router.get("/search", searchExplore);
export { router as ExploreRoutes }