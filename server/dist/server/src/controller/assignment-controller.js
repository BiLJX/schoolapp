"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAssignment = exports.getRedoStudents = exports.getPendingStudents = exports.getSubmittedStudents = exports.redoAssignment = exports.submitAssignment = exports.createAssignment = exports.getAssignedStudents = exports.getStudentsAssignment = exports.getAssignmentById = exports.getGivenAssignments = void 0;
var moment_1 = __importDefault(require("moment"));
var Assignment_1 = require("../models/Assignment");
var Student_1 = require("../models/Student");
var idgen_1 = require("../utils/idgen");
var Response_1 = __importDefault(require("../utils/Response"));
var getGivenAssignments = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var jsonResponse, currentUser, assignments, _a, _b, error_1;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                jsonResponse = new Response_1.default(res);
                currentUser = res.locals.user;
                _c.label = 1;
            case 1:
                _c.trys.push([1, 4, , 5]);
                return [4 /*yield*/, Assignment_1.Assignments.find({
                        school_id: currentUser.school_id,
                        assigned_by: currentUser.user_id
                    }).sort({ createdAt: -1 }).exec()];
            case 2:
                assignments = _c.sent();
                assignments = assignments.map(function (x) {
                    x.given_on = moment_1.default(x.createdAt).format("MMMM Do YYYY");
                    return x;
                });
                _b = (_a = jsonResponse).success;
                return [4 /*yield*/, groupAssignment(assignments)];
            case 3:
                _b.apply(_a, [_c.sent()]);
                return [3 /*break*/, 5];
            case 4:
                error_1 = _c.sent();
                console.log(error_1);
                jsonResponse.serverError();
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.getGivenAssignments = getGivenAssignments;
var getAssignmentById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var jsonResponse, currentUser, assignment_id, assignment, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                jsonResponse = new Response_1.default(res);
                currentUser = res.locals.user;
                assignment_id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 6, , 7]);
                if (!assignment_id)
                    return [2 /*return*/, jsonResponse.notFound("Assignment not found!")];
                assignment = void 0;
                if (!(currentUser.type === "student")) return [3 /*break*/, 3];
                return [4 /*yield*/, Assignment_1.Assignments.aggregate([
                        {
                            $match: {
                                assigned_class: {
                                    $in: [currentUser.class_id]
                                },
                                assignment_id: assignment_id
                            }
                        },
                        {
                            $lookup: {
                                from: "teachers",
                                as: "author_data",
                                foreignField: "user_id",
                                localField: "assigned_by",
                                pipeline: [
                                    {
                                        $project: {
                                            profile_picture_url: 1,
                                            full_name: 1
                                        }
                                    }
                                ]
                            }
                        },
                    ])];
            case 2:
                assignment = (_a.sent())[0];
                return [3 /*break*/, 5];
            case 3: return [4 /*yield*/, Assignment_1.Assignments.aggregate([
                    {
                        $match: {
                            assigned_by: currentUser.user_id,
                            assignment_id: assignment_id
                        }
                    },
                    {
                        $lookup: {
                            from: "teachers",
                            as: "author_data",
                            foreignField: "user_id",
                            localField: "assigned_by",
                            pipeline: [
                                {
                                    $project: {
                                        profile_picture_url: 1,
                                        full_name: 1
                                    }
                                }
                            ]
                        }
                    },
                ])];
            case 4:
                assignment = (_a.sent())[0];
                _a.label = 5;
            case 5:
                if (currentUser.type === "student") {
                    if (assignment.completed_by.includes(currentUser.user_id))
                        assignment.status = "completed";
                    else if (assignment.redo_by.includes(currentUser.user_id))
                        assignment.status = "redo";
                    else
                        assignment.status = "pending";
                }
                if (!assignment)
                    return [2 /*return*/, jsonResponse.notFound("Assignment not found!")];
                assignment.given_on = moment_1.default(assignment.createdAt).format("MMMM Do YYYY");
                jsonResponse.success(assignment);
                return [3 /*break*/, 7];
            case 6:
                error_2 = _a.sent();
                console.log(error_2);
                jsonResponse.serverError();
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.getAssignmentById = getAssignmentById;
var getStudentsAssignment = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var jsonResponse, currentUser, status_1, assignments, _a, _b, error_3;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                jsonResponse = new Response_1.default(res);
                currentUser = res.locals.user;
                _c.label = 1;
            case 1:
                _c.trys.push([1, 4, , 5]);
                status_1 = req.query.status;
                if (currentUser.type !== "student")
                    return [2 /*return*/, jsonResponse.notAuthorized()];
                return [4 /*yield*/, Assignment_1.Assignments.aggregate([
                        {
                            $match: {
                                assigned_class: {
                                    $in: [currentUser.class_id]
                                }
                            }
                        },
                        {
                            $sort: {
                                createdAt: -1
                            }
                        },
                        {
                            $lookup: {
                                from: "teachers",
                                as: "author_data",
                                foreignField: "user_id",
                                localField: "assigned_by",
                                pipeline: [
                                    {
                                        $project: {
                                            profile_picture_url: 1,
                                            full_name: 1
                                        }
                                    }
                                ]
                            }
                        },
                    ])];
            case 2:
                assignments = _c.sent();
                assignments = assignments.map(function (x) {
                    if (x.completed_by.includes(currentUser.user_id))
                        x.status = "completed";
                    else if (x.redo_by.includes(currentUser.user_id))
                        x.status = "redo";
                    else
                        x.status = "pending";
                    x.given_on = moment_1.default(x.createdAt).format("MMMM Do YYYY");
                    return x;
                }).filter(function (x) {
                    if (status_1 === "all")
                        return true;
                    return x.status === status_1;
                });
                _b = (_a = jsonResponse).success;
                return [4 /*yield*/, groupAssignment(assignments)];
            case 3:
                _b.apply(_a, [_c.sent()]);
                return [3 /*break*/, 5];
            case 4:
                error_3 = _c.sent();
                console.log(error_3);
                jsonResponse.serverError();
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.getStudentsAssignment = getStudentsAssignment;
var getAssignedStudents = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var jsonResponse, _a, user_id, school_id, assignment_id, assignments_1, data, error_4;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                jsonResponse = new Response_1.default(res);
                _a = res.locals.user, user_id = _a.user_id, school_id = _a.school_id;
                _c.label = 1;
            case 1:
                _c.trys.push([1, 3, , 4]);
                assignment_id = req.params.id;
                return [4 /*yield*/, Assignment_1.Assignments.aggregate([
                        {
                            $match: {
                                assignment_id: assignment_id,
                                school_id: school_id,
                                assigned_by: user_id,
                            }
                        },
                        {
                            $lookup: {
                                from: "students",
                                as: "assigned_students",
                                let: {
                                    clases: "$assigned_class",
                                    completed_by: "$completed_by"
                                },
                                pipeline: [
                                    {
                                        $match: {
                                            $expr: {
                                                $and: [
                                                    { $in: ["$class_id", "$$clases"] },
                                                    { $not: { $in: ["$user_id", "$$completed_by"] } }
                                                ]
                                            },
                                            student_verified: true,
                                        }
                                    },
                                    {
                                        $project: {
                                            user_id: 1,
                                            full_name: 1,
                                            profile_picture_url: 1
                                        }
                                    }
                                ]
                            }
                        },
                    ])];
            case 2:
                assignments_1 = _c.sent();
                data = (_b = assignments_1[0]) === null || _b === void 0 ? void 0 : _b.assigned_students;
                if (!data)
                    return [2 /*return*/, jsonResponse.notFound("Assignment Not Found.")];
                data = data.map(function (x) {
                    x.has_to_redo = assignments_1[0].redo_by.includes(x.user_id);
                    return x;
                });
                jsonResponse.success(data);
                return [3 /*break*/, 4];
            case 3:
                error_4 = _c.sent();
                console.log(error_4);
                jsonResponse.serverError();
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getAssignedStudents = getAssignedStudents;
var createAssignment = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var jsonResponse, currentUser, notification, upload_data, assignment_1, users, receiver_ids, error_5, error_6;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                jsonResponse = new Response_1.default(res);
                currentUser = res.locals.user;
                notification = req.app.locals.notification;
                _c.label = 1;
            case 1:
                _c.trys.push([1, 7, , 8]);
                upload_data = req.body;
                //reasign
                upload_data.title = ((_a = upload_data.title) === null || _a === void 0 ? void 0 : _a.trim()) || null;
                upload_data.description = ((_b = upload_data.description) === null || _b === void 0 ? void 0 : _b.trim()) || null;
                /* validations */
                //null validations
                if (!upload_data.title)
                    return [2 /*return*/, jsonResponse.clientError("Please provide a title")];
                if (!upload_data.description)
                    return [2 /*return*/, jsonResponse.clientError("Please provide a description")];
                if (!upload_data.due)
                    return [2 /*return*/, jsonResponse.clientError("Please provide a due date")];
                if (!upload_data.points)
                    return [2 /*return*/, jsonResponse.clientError("Please provide points")];
                if (upload_data.points < 1 && upload_data.points > 10)
                    return [2 /*return*/, jsonResponse.clientError("Points should be greator than 0 but less than 11")];
                if (upload_data.assigned_to.length === 0)
                    return [2 /*return*/, jsonResponse.clientError("Please assign a class")];
                assignment_1 = new Assignment_1.Assignments(__assign(__assign({}, upload_data), { assigned_by: currentUser.user_id, assignment_id: idgen_1.makeId(), school_id: currentUser.school_id, assigned_class: upload_data.assigned_to.map(function (x) { return x.class_id; }), completed_by: [], redo_by: [], due: new Date(upload_data.due) }));
                return [4 /*yield*/, assignment_1.save()];
            case 2:
                _c.sent();
                jsonResponse.success(assignment_1.toJSON());
                _c.label = 3;
            case 3:
                _c.trys.push([3, 5, , 6]);
                return [4 /*yield*/, Student_1.Students.find({ class_id: {
                            $in: assignment_1.assigned_class
                        } })];
            case 4:
                users = _c.sent();
                receiver_ids = users.map(function (x) { return x.user_id; });
                receiver_ids.forEach(function (x) { return __awaiter(void 0, void 0, void 0, function () {
                    var error_7;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                return [4 /*yield*/, notification.notify({
                                        type: notification.Types.NEW_ASSIGNMENT,
                                        receiver_id: x,
                                        sender_id: currentUser.user_id,
                                        content: assignment_1.id,
                                        sender_data: {
                                            full_name: currentUser.full_name,
                                            profile_picture_url: currentUser.profile_picture_url,
                                            type: "teacher"
                                        },
                                    }, false)];
                            case 1:
                                _a.sent();
                                return [3 /*break*/, 3];
                            case 2:
                                error_7 = _a.sent();
                                console.log(error_7);
                                return [3 /*break*/, 3];
                            case 3: return [2 /*return*/];
                        }
                    });
                }); });
                return [3 /*break*/, 6];
            case 5:
                error_5 = _c.sent();
                console.log(error_5);
                return [3 /*break*/, 6];
            case 6: return [3 /*break*/, 8];
            case 7:
                error_6 = _c.sent();
                console.log(error_6);
                jsonResponse.serverError();
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.createAssignment = createAssignment;
var submitAssignment = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var jsonResponse, _a, user_id, school_id, assignment_id, student_id, assignment, total_points, log, error_8;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                jsonResponse = new Response_1.default(res);
                _a = res.locals.user, user_id = _a.user_id, school_id = _a.school_id;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 7, , 8]);
                assignment_id = req.params.id;
                student_id = req.body.student_id;
                if (!student_id)
                    return [2 /*return*/, jsonResponse.notFound("Student not found.")];
                if (!assignment_id)
                    return [2 /*return*/, jsonResponse.notFound("Assignment Not Found.")];
                return [4 /*yield*/, Assignment_1.Assignments.findOne({ assignment_id: assignment_id, assigned_by: user_id })];
            case 2:
                assignment = _b.sent();
                if (!assignment)
                    return [2 /*return*/, jsonResponse.notFound("Assignment Not Found.")];
                if (assignment.completed_by.includes(student_id))
                    return [2 /*return*/, jsonResponse.clientError("The student has already submitted")];
                return [4 /*yield*/, assignment.updateOne({
                        $push: {
                            completed_by: student_id
                        }
                    })];
            case 3:
                _b.sent();
                if (!assignment.redo_by.includes(student_id)) return [3 /*break*/, 5];
                return [4 /*yield*/, assignment.updateOne({ $pull: { redo_by: student_id } })];
            case 4:
                _b.sent();
                _b.label = 5;
            case 5:
                total_points = calcAssignmentPoints(assignment);
                log = new Assignment_1.AssignmentLog({
                    log_id: idgen_1.makeId(),
                    log_type: "completed",
                    school_id: school_id,
                    assigned_by: user_id,
                    assignment_id: assignment_id,
                    log_of: student_id,
                    points_gained: total_points
                });
                return [4 /*yield*/, log.save()];
            case 6:
                _b.sent();
                jsonResponse.success();
                return [3 /*break*/, 8];
            case 7:
                error_8 = _b.sent();
                console.log(error_8);
                jsonResponse.serverError();
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.submitAssignment = submitAssignment;
var redoAssignment = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var jsonResponse, _a, user_id, school_id, assignment_id, student_id, assignment, log, error_9;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                jsonResponse = new Response_1.default(res);
                _a = res.locals.user, user_id = _a.user_id, school_id = _a.school_id;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 5, , 6]);
                assignment_id = req.params.id;
                student_id = req.body.student_id;
                if (!student_id)
                    return [2 /*return*/, jsonResponse.notFound("Student not found.")];
                if (!assignment_id)
                    return [2 /*return*/, jsonResponse.notFound("Assignment Not Found.")];
                return [4 /*yield*/, Assignment_1.Assignments.findOne({ assignment_id: assignment_id, assigned_by: user_id })];
            case 2:
                assignment = _b.sent();
                if (!assignment)
                    return [2 /*return*/, jsonResponse.notFound("Assignment Not Found.")];
                if (assignment.redo_by.includes(student_id))
                    return [2 /*return*/, jsonResponse.clientError("The student has already submitted")];
                return [4 /*yield*/, assignment.updateOne({
                        $push: {
                            redo_by: student_id
                        }
                    })];
            case 3:
                _b.sent();
                log = new Assignment_1.AssignmentLog({
                    log_id: idgen_1.makeId(),
                    log_type: "redo",
                    school_id: school_id,
                    assigned_by: user_id,
                    assignment_id: assignment_id,
                    log_of: student_id,
                });
                return [4 /*yield*/, log.save()];
            case 4:
                _b.sent();
                jsonResponse.success();
                return [3 /*break*/, 6];
            case 5:
                error_9 = _b.sent();
                console.log(error_9);
                jsonResponse.serverError();
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.redoAssignment = redoAssignment;
var getSubmittedStudents = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var jsonResponse, school_id, assignment_id, assignment, submitted_students_id, submitted_students, error_10;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                jsonResponse = new Response_1.default(res);
                school_id = res.locals.user.school_id;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                assignment_id = req.params.id;
                return [4 /*yield*/, Assignment_1.Assignments.findOne({ assignment_id: assignment_id, school_id: school_id })];
            case 2:
                assignment = (_a = (_b.sent())) === null || _a === void 0 ? void 0 : _a.toJSON();
                if (!assignment)
                    return [2 /*return*/, jsonResponse.clientError("Assignment not found")];
                submitted_students_id = assignment.completed_by;
                return [4 /*yield*/, Student_1.Students.find({ user_id: { $in: submitted_students_id }, student_verified: true }).select("user_id full_name profile_picture_url").exec()];
            case 3:
                submitted_students = _b.sent();
                jsonResponse.success(submitted_students);
                return [3 /*break*/, 5];
            case 4:
                error_10 = _b.sent();
                console.log(error_10);
                jsonResponse.serverError();
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.getSubmittedStudents = getSubmittedStudents;
var getPendingStudents = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var jsonResponse, school_id, assignment_id, assignments_2, students, error_11;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                jsonResponse = new Response_1.default(res);
                school_id = res.locals.user.school_id;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                assignment_id = req.params.id;
                return [4 /*yield*/, Assignment_1.Assignments.aggregate([
                        {
                            $match: {
                                assignment_id: assignment_id,
                                school_id: school_id,
                            }
                        },
                        {
                            $lookup: {
                                from: "students",
                                as: "assigned_students",
                                let: {
                                    clases: "$assigned_class",
                                    completed_by: "$completed_by"
                                },
                                pipeline: [
                                    {
                                        $match: {
                                            $expr: {
                                                $and: [
                                                    { $in: ["$class_id", "$$clases"] },
                                                    { $not: { $in: ["$user_id", "$$completed_by"] } }
                                                ]
                                            },
                                            student_verified: true
                                        }
                                    },
                                    {
                                        $project: {
                                            user_id: 1,
                                            full_name: 1,
                                            profile_picture_url: 1
                                        }
                                    }
                                ]
                            }
                        },
                    ])];
            case 2:
                assignments_2 = _b.sent();
                students = (_a = assignments_2[0]) === null || _a === void 0 ? void 0 : _a.assigned_students;
                if (!students)
                    return [2 /*return*/, jsonResponse.clientError("Assignment not found")];
                students = students.filter(function (x) { return !assignments_2[0].completed_by.includes(x.user_id); });
                jsonResponse.success(students);
                return [3 /*break*/, 4];
            case 3:
                error_11 = _b.sent();
                console.log(error_11);
                jsonResponse.serverError();
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getPendingStudents = getPendingStudents;
var getRedoStudents = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var jsonResponse, school_id, assignment_id, assignment, redo_students_id, redo_students, error_12;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                jsonResponse = new Response_1.default(res);
                school_id = res.locals.user.school_id;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                assignment_id = req.params.id;
                return [4 /*yield*/, Assignment_1.Assignments.findOne({ assignment_id: assignment_id, school_id: school_id })];
            case 2:
                assignment = (_a = (_b.sent())) === null || _a === void 0 ? void 0 : _a.toJSON();
                if (!assignment)
                    return [2 /*return*/, jsonResponse.clientError("Assignment not found")];
                redo_students_id = assignment.redo_by;
                return [4 /*yield*/, Student_1.Students.find({ user_id: { $in: redo_students_id }, student_verified: true }).select("user_id full_name profile_picture_url")];
            case 3:
                redo_students = _b.sent();
                jsonResponse.success(redo_students);
                return [3 /*break*/, 5];
            case 4:
                error_12 = _b.sent();
                console.log(error_12);
                jsonResponse.serverError();
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.getRedoStudents = getRedoStudents;
var deleteAssignment = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var jsonResponse, user_id, assignment_id, error_13;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                jsonResponse = new Response_1.default(res);
                user_id = res.locals.user.user_id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                assignment_id = req.params.id;
                return [4 /*yield*/, Assignment_1.Assignments.deleteOne({ assigned_by: user_id, assignment_id: assignment_id })];
            case 2:
                _a.sent();
                return [2 /*return*/, jsonResponse.success()];
            case 3:
                error_13 = _a.sent();
                console.log(error_13);
                jsonResponse.serverError();
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deleteAssignment = deleteAssignment;
var groupAssignment = function (assignments) { return __awaiter(void 0, void 0, void 0, function () {
    var map, _loop_1, _i, assignments_3, assignment, data;
    return __generator(this, function (_a) {
        map = {};
        _loop_1 = function (assignment) {
            if (!map[assignment.given_on]) {
                map[assignment.given_on] = assignments.filter(function (x) { return x.given_on === assignment.given_on; });
            }
        };
        for (_i = 0, assignments_3 = assignments; _i < assignments_3.length; _i++) {
            assignment = assignments_3[_i];
            _loop_1(assignment);
        }
        data = Object.keys(map).map(function (x) {
            return {
                given_on: x,
                assignments: map[x]
            };
        });
        return [2 /*return*/, data];
    });
}); };
var calcAssignmentPoints = function (assignment_obj) {
    var submitted_date = moment_1.default(new Date());
    var due_date = moment_1.default(assignment_obj.due);
    var created_date = moment_1.default(assignment_obj.createdAt);
    var submitted = submitted_date.diff(created_date, "days", false) - 1;
    if (submitted < 0)
        submitted = 0;
    var due = due_date.diff(created_date, "days", false) + 1;
    if (due < submitted)
        return 0;
    var points = assignment_obj.points;
    var decimal_points = points * ((due - submitted) / due);
    return Math.round(decimal_points);
};
