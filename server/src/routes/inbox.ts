import { Router } from "express";
import { getActivity, getInbox, readNotification } from "../controller/inbox-controller";
const router = Router();

router.get("/", getInbox);
router.get("/activity", getActivity);
router.put("/:id/read", readNotification);
export { router as InboxRoutes }