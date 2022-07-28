"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InteractionRoutes = void 0;
var express_1 = require("express");
var interaction_controller_1 = require("../controller/interaction-controller");
var router = express_1.Router();
exports.InteractionRoutes = router;
router.post("/", interaction_controller_1.giveInteraction);
