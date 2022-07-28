"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InboxRoutes = void 0;
var express_1 = require("express");
var inbox_controller_1 = require("../controller/inbox-controller");
var router = express_1.Router();
exports.InboxRoutes = router;
router.get("/", inbox_controller_1.getInbox);
router.get("/activity", inbox_controller_1.getActivity);
