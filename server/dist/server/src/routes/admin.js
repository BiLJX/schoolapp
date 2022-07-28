"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRoutes = void 0;
var express_1 = require("express");
var admin_controller_1 = require("../controller/admin-controller");
var router = express_1.Router();
exports.AdminRoutes = router;
router.get("/current", admin_controller_1.getCurrentAdmin);
//classes
router.get("/classes", admin_controller_1.Classes.getClasses);
router.put("/class", admin_controller_1.Classes.addClasses);
router.delete("/class/:class_id", admin_controller_1.Classes.removeClass);
//req controls
router.get("/requests/students", admin_controller_1.AdminUser.getStudentAccountRequests);
router.get("/requests/teachers", admin_controller_1.AdminUser.getTeacherAccountRequests);
router.put("/requests/students/:user_id/approve", admin_controller_1.AdminUser.approveStudentAccount);
router.put("/requests/teachers/:user_id/approve", admin_controller_1.AdminUser.approveTeacherAccount);
router.delete("/requests/students/:user_id/reject", admin_controller_1.AdminUser.rejectStudentAccount);
router.delete("/requests/teachers/:user_id/reject", admin_controller_1.AdminUser.rejectTeacherAccount);
