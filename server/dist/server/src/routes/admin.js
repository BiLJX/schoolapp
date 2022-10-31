"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRoutes = void 0;
var express_1 = require("express");
var admin_controller_1 = require("../controller/admin-controller");
var admin_classes_1 = require("../controller/admin/admin-classes");
var admin_dashboard_1 = require("../controller/admin/admin-dashboard");
var AdminRequets = __importStar(require("../controller/admin/admin-requets"));
var ManageUsers = __importStar(require("../controller/admin/manage-user"));
var router = express_1.Router();
exports.AdminRoutes = router;
router.get("/current", admin_controller_1.getCurrentAdmin);
//classes
router.get("/classes", admin_classes_1.getClasses);
router.get("/classes/:class_id/students", admin_classes_1.getClassStudents);
router.get("/classes/:class_id/info", admin_classes_1.getClassById);
router.patch("/classes/:class_id/update", admin_classes_1.editClass);
router.put("/class", admin_classes_1.addClasses);
router.put("/classes/student/add", admin_classes_1.addStudent);
router.delete("/class/:class_id", admin_classes_1.removeClass);
//manage
router.get("/manage/students", ManageUsers.getAdminStudents);
router.get("/manage/teachers", ManageUsers.getAdminTeachers);
router.patch("/manage/teachers/update", ManageUsers.updateTeacher);
router.patch("/manage/students/update", ManageUsers.updateStudent);
router.post("/manage/students/create", ManageUsers.createStudent);
router.post("/manage/teachers/create", ManageUsers.createTeacher);
//req controls
router.get("/requests/students", AdminRequets.getStudentAccountRequests);
router.get("/requests/teachers", AdminRequets.getTeacherAccountRequests);
router.put("/requests/students/approve", AdminRequets.approveStudentAccount);
router.put("/requests/teachers/approve", AdminRequets.approveTeacherAccount);
router.delete("/requests/students/:user_id/reject", AdminRequets.rejectStudentAccount);
router.delete("/requests/teachers/:user_id/reject", AdminRequets.rejectTeacherAccount);
//dashboard
router.get("/dashboard", admin_dashboard_1.getDashboard);
router.get("/dashboard/notices", admin_dashboard_1.getAdminNotices);
router.delete("/dashboard/notices/:id/delete", admin_dashboard_1.deleteNotice);
