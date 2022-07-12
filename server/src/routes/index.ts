import { Router } from "express";
import { AdminAuth } from "../middleware/admin";
import { AdminRoutes } from "./admin";
import { AuthRoutes } from "./auth";

const router = Router()

router.use("/auth", AuthRoutes)
router.use("/admin", AdminAuth, AdminRoutes)

export {router as ApiRoutes}