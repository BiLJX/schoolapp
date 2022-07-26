import { Router } from "express";
import { getInbox } from "../controller/inbox-controller";
const router = Router();

router.get("/", getInbox)

export { router as InboxRoutes }