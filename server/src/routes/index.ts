import { Router } from "express";
import { AdminAuth } from "../middleware/admin";
import { UserAuth } from "../middleware/user";
import { AdminRoutes } from "./admin";
import { AuthRoutes } from "./auth";
import { CommentRoutes } from "./comment";
import { PostRoutes } from "./posts";
import { SchoolRoutes } from "./school";
import { UserRoutes } from "./user";
import nodemailer from "nodemailer"
import { InteractionRoutes } from "./interaction";
import { TeacherAuth } from "../middleware/teacher";
import { InboxRoutes } from "./inbox";
import { AssignmentRoutes } from "./assignment";
import { ExploreRoutes } from "./explore";
import { AnnouncementRoutes } from "./announcement";

const router = Router()

router.use("/auth", AuthRoutes)
router.use("/schools", SchoolRoutes)
router.use("/admin", AdminAuth, AdminRoutes)
router.use("/user", UserAuth, UserRoutes);
router.use("/post", UserAuth, PostRoutes);
router.use("/comment", UserAuth, CommentRoutes);
router.use("/inbox", UserAuth, InboxRoutes);
router.use("/interaction", UserAuth, TeacherAuth, InteractionRoutes);
router.use("/assignment", UserAuth, AssignmentRoutes);
router.use("/explore", UserAuth, ExploreRoutes);
router.use("/announcement", AnnouncementRoutes);















router.get("/email", async (req, res) => {
    try {
        const mail = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "billjeshbaidya",
                pass: "uaqwilhkjautgahp"
            }
        })
        await mail.sendMail({
            from: "DjBillje Official",
            to: "billjesh.baidya_1391@euroschool.edu.np",
            subject: "Test",
            text: "Test"
        })
        res.status(200).json({ status: "ok" })
    } catch (error) {
        console.log(error);
        res.json(error)
    }

})
export { router as ApiRoutes }