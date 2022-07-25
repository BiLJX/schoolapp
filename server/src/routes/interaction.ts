import { Router } from "express";
import { giveInteraction } from "../controller/interaction-controller";
const router = Router();

router.post("/", giveInteraction);

export { router as InteractionRoutes }