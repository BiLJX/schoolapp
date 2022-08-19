import { Router } from "express";
import { createAnnouncement, getAnnouncements } from "../controller/announcement-controller";
import { AdminAuth } from "../middleware/admin";
import { UserAuth } from "../middleware/user";

const router = Router();

router.post("/create", AdminAuth, createAnnouncement);
router.get("/", UserAuth, getAnnouncements)
export { router as AnnouncementRoutes }