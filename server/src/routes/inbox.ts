import { Router } from "express";
import { getActivity, getInbox } from "../controller/inbox-controller";
const router = Router();

router.get("/", getInbox);
router.get("/activity", getActivity);
export { router as InboxRoutes }