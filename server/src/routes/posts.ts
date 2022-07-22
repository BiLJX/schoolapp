import { Router } from "express";
import { getFeedPost, uploadPost } from "../controller/post-controller";
const router = Router();

router.get("/feed", getFeedPost);

router.post("/upload", uploadPost)

export { router as PostRoutes }