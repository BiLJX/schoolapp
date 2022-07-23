import { Router } from "express";
import { addComment } from "../controller/comment-controller";
const router = Router();

router.post("/add", addComment)

export { router as CommentRoutes}