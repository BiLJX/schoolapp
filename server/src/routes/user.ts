import { Router } from "express";
import { getCurrentUser } from "../controller/user-controller";

const router = Router();

router.get("/current", getCurrentUser);


export { router as UserRoutes }