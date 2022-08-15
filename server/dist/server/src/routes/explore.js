"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExploreRoutes = void 0;
var express_1 = require("express");
var explore_controller_1 = require("../controller/explore-controller");
var router = express_1.Router();
exports.ExploreRoutes = router;
router.get("/top", explore_controller_1.getTopStudents);
router.get("/search", explore_controller_1.searchExplore);
