"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchoolRoutes = void 0;
var express_1 = require("express");
var school_controller_1 = require("../controller/school-controller");
var router = express_1.Router();
exports.SchoolRoutes = router;
router.get("/", school_controller_1.getSchools);
router.get("/:school_id/classes", school_controller_1.getClasses);
