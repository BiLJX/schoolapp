"use strict";
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
exports.rejectTeacherAccount = exports.rejectStudentAccount = exports.approveTeacherAccount = exports.approveStudentAccount = exports.getTeacherAccountRequests = exports.getStudentAccountRequests = void 0;
var Student_1 = require("../../models/Student");
var Response_1 = __importDefault(require("../../utils/Response"));
var Teacher_1 = require("../../models/Teacher");
var mail_1 = require("../../utils/mail");
var validator_1 = require("../../utils/validator");
var firebase_admin_1 = __importDefault(require("firebase-admin"));
var st = firebase_admin_1.default.storage();
var getStudentAccountRequests = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var jsonResponse, admin, searchQuery, students, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                jsonResponse = new Response_1.default(res);
                admin = res.locals.admin;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                searchQuery = req.query.s || "";
                return [4 /*yield*/, Student_1.Students.aggregate([
                        {
                            $match: {
                                full_name: { $regex: searchQuery, $options: 'i' },
                                school_id: admin.school_id,
                                student_verified: false
                            }
                        },
                        {
                            $sort: {
                                createdAt: -1
                            }
                        },
                        {
                            $project: {
                                password: 0
                            }
                        }
                    ])];
            case 2:
                students = _a.sent();
                return [2 /*return*/, jsonResponse.success(students)];
            case 3:
                error_1 = _a.sent();
                console.log(error_1);
                jsonResponse.serverError();
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getStudentAccountRequests = getStudentAccountRequests;
var getTeacherAccountRequests = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var jsonResponse, admin, searchQuery, teachers, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                jsonResponse = new Response_1.default(res);
                admin = res.locals.admin;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                searchQuery = req.query.s || "";
                return [4 /*yield*/, Teacher_1.Teachers.aggregate([
                        {
                            $match: {
                                full_name: { $regex: searchQuery, $options: 'i' },
                                school_id: admin.school_id,
                                teacher_verified: false
                            }
                        },
                        {
                            $sort: {
                                createdAt: -1
                            }
                        },
                        {
                            $project: {
                                password: 0
                            }
                        }
                    ])];
            case 2:
                teachers = _a.sent();
                return [2 /*return*/, jsonResponse.success(teachers)];
            case 3:
                error_2 = _a.sent();
                console.log(error_2);
                jsonResponse.serverError();
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getTeacherAccountRequests = getTeacherAccountRequests;
//put
var approveStudentAccount = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var jsonResponse, admin, user, nameValidation, emailValidation, student, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                jsonResponse = new Response_1.default(res);
                admin = res.locals.admin;
                user = req.body;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                user.full_name = user.full_name.trim();
                user.email = user.email.toLowerCase().trim();
                nameValidation = validator_1.validateFullName(user.full_name);
                emailValidation = validator_1.validateEmail(user.email);
                if (!nameValidation.success)
                    return [2 /*return*/, jsonResponse.clientError(nameValidation.message)];
                if (!emailValidation.success)
                    return [2 /*return*/, jsonResponse.clientError(emailValidation.message)];
                return [4 /*yield*/, Student_1.Students.findOneAndUpdate({ user_id: user.user_id, school_id: admin.school_id }, {
                        $set: {
                            student_verified: true,
                            full_name: user.full_name,
                            email: user.email,
                            gender: user.gender,
                            class_id: user.class_id,
                            mothers_email: user.mothers_email,
                            fathers_email: user.fathers_email
                        }
                    })];
            case 2:
                student = _a.sent();
                jsonResponse.success("Student Approved");
                if (!student) return [3 /*break*/, 4];
                return [4 /*yield*/, mail_1.sendMail({
                        to: student.email,
                        subject: "Your Account has been approved",
                        body: "Your account has been approved you can now login to your account"
                    })];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                error_3 = _a.sent();
                console.log(error_3);
                jsonResponse.serverError();
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.approveStudentAccount = approveStudentAccount;
var approveTeacherAccount = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var jsonResponse, admin, user, nameValidation, emailValidation, teacher, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                jsonResponse = new Response_1.default(res);
                admin = res.locals.admin;
                user = req.body;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                nameValidation = validator_1.validateFullName(user.full_name);
                emailValidation = validator_1.validateEmail(user.email.trim());
                if (!nameValidation.success)
                    return [2 /*return*/, jsonResponse.clientError(nameValidation.message)];
                if (!emailValidation.success)
                    return [2 /*return*/, jsonResponse.clientError(emailValidation.message)];
                return [4 /*yield*/, Teacher_1.Teachers.findOneAndUpdate({ user_id: user.user_id, school_id: admin.school_id }, {
                        $set: {
                            teacher_verified: true,
                            full_name: user.full_name.trim(),
                            email: user.email.trim(),
                            gender: user.gender,
                        }
                    })];
            case 2:
                teacher = _a.sent();
                jsonResponse.success("Teacher Approved");
                if (!teacher) return [3 /*break*/, 4];
                return [4 /*yield*/, mail_1.sendMail({
                        to: teacher.email,
                        subject: "Your Account has been accepted",
                        body: "Your account has been accepted by admin. You can now login to your account"
                    })];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                error_4 = _a.sent();
                console.log(error_4);
                jsonResponse.serverError();
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.approveTeacherAccount = approveTeacherAccount;
//delete
var rejectStudentAccount = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var jsonResponse, school_id, user_id, student, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                jsonResponse = new Response_1.default(res);
                school_id = res.locals.admin.school_id;
                user_id = req.params.user_id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 7, , 8]);
                return [4 /*yield*/, Student_1.Students.findOneAndDelete({ user_id: user_id, school_id: school_id, student_verified: false })];
            case 2:
                student = _a.sent();
                if (!student) return [3 /*break*/, 4];
                return [4 /*yield*/, st.bucket().deleteFiles({ prefix: "user/" + (student === null || student === void 0 ? void 0 : student.user_id) })];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4:
                jsonResponse.success("User rejected");
                if (!student) return [3 /*break*/, 6];
                return [4 /*yield*/, mail_1.sendMail({
                        to: student.email,
                        subject: "Your Account has been rejected",
                        body: "Your account has been rejected by admin. Please consult with your school admin about it."
                    })];
            case 5:
                _a.sent();
                _a.label = 6;
            case 6: return [3 /*break*/, 8];
            case 7:
                error_5 = _a.sent();
                console.log(error_5);
                jsonResponse.serverError();
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.rejectStudentAccount = rejectStudentAccount;
var rejectTeacherAccount = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var jsonResponse, school_id, user_id, teacher, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                jsonResponse = new Response_1.default(res);
                school_id = res.locals.admin.school_id;
                user_id = req.params.user_id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 7, , 8]);
                return [4 /*yield*/, Teacher_1.Teachers.findOneAndDelete({ user_id: user_id, school_id: school_id, teacher_verified: false })];
            case 2:
                teacher = _a.sent();
                if (!teacher) return [3 /*break*/, 4];
                return [4 /*yield*/, st.bucket().deleteFiles({ prefix: "user/" + (teacher === null || teacher === void 0 ? void 0 : teacher.user_id) })];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4:
                jsonResponse.success("User rejected");
                if (!teacher) return [3 /*break*/, 6];
                return [4 /*yield*/, mail_1.sendMail({
                        to: teacher.email,
                        subject: "Your Account has been rejected",
                        body: "Your account has been rejected by admin. Please consult with your school admin about it."
                    })];
            case 5:
                _a.sent();
                _a.label = 6;
            case 6: return [3 /*break*/, 8];
            case 7:
                error_6 = _a.sent();
                console.log(error_6);
                jsonResponse.serverError();
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.rejectTeacherAccount = rejectTeacherAccount;
