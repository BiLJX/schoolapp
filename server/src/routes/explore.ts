import { Router } from "express";
import { getTopStudents } from "../controller/explore-controller";
import { UserAuth } from "../middleware/user";
const router = Router();

router.get("/top", getTopStudents)

export { router as ExploreRoutes }