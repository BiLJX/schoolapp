import { Router } from "express"
import { 
    adminLogin, 
    studentLogin, 
    studentSignUp, 
    teacherLogin, 
    teacherSignup
} from "../controller/auth-controller";

const router = Router();

router.post("/login")
router.post("/login/admin", adminLogin)
router.post("/login/student", studentLogin)
router.post("/login/teacher", teacherLogin)
router.post("/signup/student", studentSignUp)
router.post("/signup/teacher", teacherSignup)
export { router as AuthRoutes }