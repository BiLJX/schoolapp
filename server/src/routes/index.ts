import { Router } from "express";
import { AdminAuth } from "../middleware/admin";
import { UserAuth } from "../middleware/user";
import { AdminRoutes } from "./admin";
import { AuthRoutes } from "./auth";
import { CommentRoutes } from "./comment";
import { PostRoutes } from "./posts";
import { SchoolRoutes } from "./school";
import { UserRoutes } from "./user";

const router = Router()

router.use("/auth", AuthRoutes)
router.use("/schools", SchoolRoutes)
router.use("/admin", AdminAuth, AdminRoutes)
router.use("/user", UserAuth, UserRoutes);
router.use("/post", UserAuth, PostRoutes)
router.use("/comment", UserAuth, CommentRoutes)
export {router as ApiRoutes}