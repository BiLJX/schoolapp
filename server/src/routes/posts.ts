import { Router } from "express";
import { uploadPost } from "../controller/post-controller";
const router = Router();

router.post("/upload", uploadPost)

export { router as PostRoutes }