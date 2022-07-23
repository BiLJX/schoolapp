import { Router } from "express";
import { addComment, addReply, getComments } from "../controller/comment-controller";
const router = Router();

router.get("/:post_id", getComments)
router.post("/add", addComment)
router.post("/reply", addReply)

export { router as CommentRoutes}