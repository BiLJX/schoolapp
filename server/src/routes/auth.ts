import { Router } from "express"
import { adminLogin } from "../controller/auth-controller";

const router = Router();

router.post("/login")
router.post("/login/admin", adminLogin)

router.post("/signup")

export { router as AuthRoutes }