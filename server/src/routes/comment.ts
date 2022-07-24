import { Router } from "express";
import { addComment, addReply, getComments, likeComment, unlikeComment } from "../controller/comment-controller";
const router = Router();

router.get("/:post_id", getComments);
router.post("/add", addComment);
router.post("/reply", addReply);

router.put("/:comment_id/like", likeComment);
router.put("/:comment_id/unlike", unlikeComment);
export { router as CommentRoutes}