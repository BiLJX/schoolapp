import { Router } from "express";
import { deletePost, getFeedPost, getPostById, getPostByUserId, likePost, unlikePost, uploadPost } from "../controller/post-controller";
const router = Router();

router.post("/upload", uploadPost)

router.get("/feed", getFeedPost);
router.get("/:post_id", getPostById)
router.get("/user/:user_id", getPostByUserId)

router.put("/:post_id/like", likePost)
router.put("/:post_id/unlike", unlikePost)

router.delete("/:post_id/delete", deletePost)
export { router as PostRoutes }