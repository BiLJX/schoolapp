import { Router } from "express"
import { adminLogin, studentLogin, studentSignUp } from "../controller/auth-controller";

const router = Router();

router.post("/login")
router.post("/login/admin", adminLogin)
router.post("/login/student", studentLogin)
router.post("/signup/student", studentSignUp)

export { router as AuthRoutes }