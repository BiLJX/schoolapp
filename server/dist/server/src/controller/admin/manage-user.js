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
exports.createTeacher = exports.createStudent = exports.updateStudent = exports.updateTeacher = exports.getAdminTeachers = exports.getAdminStudents = void 0;
var Teacher_1 = require("../../models/Teacher");
var Response_1 = __importDefault(require("../../utils/Response"));
var Student_1 = require("../../models/Student");
var validator_1 = require("../../utils/validator");
var upload_1 = require("../../utils/upload");
var Class_1 = require("../../models/Class");
var idgen_1 = require("../../utils/idgen");
var bcrypt_1 = __importDefault(require("bcrypt"));
var sharp_1 = __importDefault(require("sharp"));
var getAdminStudents = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
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
                                student_verified: true
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
                jsonResponse.success(students);
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                console.log(error_1);
                jsonResponse.serverError();
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getAdminStudents = getAdminStudents;
var getAdminTeachers = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
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
                                teacher_verified: true
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
                jsonResponse.success(teachers);
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                console.log(error_2);
                jsonResponse.serverError();
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getAdminTeachers = getAdminTeachers;
var updateTeacher = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var jsonResponse, admin, user, nameValidation, emailValidation, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                jsonResponse = new Response_1.default(res);
                admin = res.locals.admin;
                user = req.body;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
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
                _a.sent();
                jsonResponse.success("Teacher Updated");
                return [3 /*break*/, 4];
            case 3:
                error_3 = _a.sent();
                console.log(error_3);
                jsonResponse.serverError();
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.updateTeacher = updateTeacher;
var updateStudent = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var jsonResponse, admin, user, nameValidation, emailValidation, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                jsonResponse = new Response_1.default(res);
                admin = res.locals.admin;
                user = req.body;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                nameValidation = validator_1.validateFullName(user.full_name);
                emailValidation = validator_1.validateEmail(user.email.trim());
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
                _a.sent();
                jsonResponse.success("Student Updated");
                return [3 /*break*/, 4];
            case 3:
                error_4 = _a.sent();
                console.log(error_4);
                jsonResponse.serverError();
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.updateStudent = updateStudent;
var createStudent = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var jsonResponse, admin;
    return __generator(this, function (_a) {
        jsonResponse = new Response_1.default(res);
        admin = res.locals.admin;
        try {
            upload_1.upload(req, res, function (err) { return __awaiter(void 0, void 0, void 0, function () {
                var data, files, pfp, nameValidation, emailValidation, mothersEmailValidation, fathersEmailValidation, passwordValidation, genderValidation, user, _class, user_id, buffer, url, salt, _a, student, error_5;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 8, , 9]);
                            if (err)
                                return [2 /*return*/, jsonResponse.serverError()];
                            data = req.body;
                            files = req.files;
                            pfp = files[0];
                            if (!data)
                                return [2 /*return*/, jsonResponse.clientError("No informations provided")];
                            //reasign
                            data.email = data.email.trim().toLocaleLowerCase();
                            data.mothers_email = data.mothers_email.trim().toLocaleLowerCase();
                            data.fathers_email = data.fathers_email.trim().toLocaleLowerCase();
                            data.full_name = data.full_name.trim();
                            nameValidation = validator_1.validateFullName(data.full_name);
                            emailValidation = validator_1.validateEmail(data.email);
                            mothersEmailValidation = validator_1.validateEmail(data.mothers_email);
                            fathersEmailValidation = validator_1.validateEmail(data.fathers_email);
                            passwordValidation = validator_1.validatePassowrd(data.password);
                            genderValidation = validator_1.validateGender(data.gender);
                            if (!pfp.mimetype.includes("image"))
                                return [2 /*return*/, jsonResponse.clientError("Invalid file format")];
                            if (!nameValidation.success)
                                return [2 /*return*/, jsonResponse.clientError(nameValidation.message)];
                            if (!emailValidation.success)
                                return [2 /*return*/, jsonResponse.clientError(emailValidation.message)];
                            if (!mothersEmailValidation.success)
                                return [2 /*return*/, jsonResponse.clientError("Invalid mother's email")];
                            if (!fathersEmailValidation.success)
                                return [2 /*return*/, jsonResponse.clientError("Invalid father's email")];
                            if (!passwordValidation.success)
                                return [2 /*return*/, jsonResponse.clientError(passwordValidation.message)];
                            if (!genderValidation.success)
                                return [2 /*return*/, jsonResponse.clientError(genderValidation.message)];
                            return [4 /*yield*/, Student_1.Students.findOne({ email: data.email })];
                        case 1:
                            user = _b.sent();
                            if (user !== null)
                                return [2 /*return*/, jsonResponse.clientError("Email address already in use")];
                            return [4 /*yield*/, Class_1.Class.findOne({ class_id: data.class_id })];
                        case 2:
                            _class = _b.sent();
                            if (_class === null)
                                return [2 /*return*/, jsonResponse.clientError("The class does not exist")];
                            user_id = idgen_1.makeId();
                            return [4 /*yield*/, sharp_1.default(pfp.buffer).jpeg({ quality: 80 }).toBuffer()];
                        case 3:
                            buffer = _b.sent();
                            return [4 /*yield*/, upload_1.uploadFile({ buffer: buffer, dir: "user/" + user_id + "/pfp/" })];
                        case 4:
                            url = _b.sent();
                            return [4 /*yield*/, bcrypt_1.default.genSalt(10)];
                        case 5:
                            salt = _b.sent();
                            _a = data;
                            return [4 /*yield*/, bcrypt_1.default.hash(data.password, salt)];
                        case 6:
                            _a.password = _b.sent();
                            student = new Student_1.Students({
                                full_name: data.full_name,
                                email: data.email,
                                class_id: data.class_id,
                                school_id: admin.school_id,
                                password: data.password,
                                profile_picture_url: url,
                                gender: data.gender,
                                mothers_email: data.mothers_email,
                                user_id: user_id,
                                fathers_email: data.fathers_email,
                                email_verified: true,
                                student_verified: true
                            });
                            return [4 /*yield*/, student.save()];
                        case 7:
                            _b.sent();
                            return [2 /*return*/, jsonResponse.success(student)];
                        case 8:
                            error_5 = _b.sent();
                            console.log(error_5);
                            jsonResponse.serverError();
                            return [3 /*break*/, 9];
                        case 9: return [2 /*return*/];
                    }
                });
            }); });
        }
        catch (error) {
            console.log(error);
            jsonResponse.serverError();
        }
        return [2 /*return*/];
    });
}); };
exports.createStudent = createStudent;
var createTeacher = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var jsonResponse, admin;
    return __generator(this, function (_a) {
        jsonResponse = new Response_1.default(res);
        admin = res.locals.admin;
        try {
            upload_1.upload(req, res, function (err) { return __awaiter(void 0, void 0, void 0, function () {
                var data, files, pfp, nameValidation, emailValidation, passwordValidation, genderValidation, user, user_id, buffer, url, salt, _a, teacher, error_6;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 7, , 8]);
                            if (err)
                                return [2 /*return*/, jsonResponse.serverError()];
                            data = req.body;
                            files = req.files;
                            pfp = files[0];
                            if (!data)
                                return [2 /*return*/, jsonResponse.clientError("No informations provided")];
                            //reasign
                            data.email = data.email.trim().toLocaleLowerCase();
                            data.full_name = data.full_name.trim();
                            nameValidation = validator_1.validateFullName(data.full_name);
                            emailValidation = validator_1.validateEmail(data.email);
                            passwordValidation = validator_1.validatePassowrd(data.password);
                            genderValidation = validator_1.validateGender(data.gender);
                            if (!pfp.mimetype.includes("image"))
                                return [2 /*return*/, jsonResponse.clientError("Invalid file format")];
                            if (!nameValidation.success)
                                return [2 /*return*/, jsonResponse.clientError(nameValidation.message)];
                            if (!emailValidation.success)
                                return [2 /*return*/, jsonResponse.clientError(emailValidation.message)];
                            if (!passwordValidation.success)
                                return [2 /*return*/, jsonResponse.clientError(passwordValidation.message)];
                            if (!genderValidation.success)
                                return [2 /*return*/, jsonResponse.clientError(genderValidation.message)];
                            return [4 /*yield*/, Teacher_1.Teachers.findOne({ email: data.email })];
                        case 1:
                            user = _b.sent();
                            if (user !== null)
                                return [2 /*return*/, jsonResponse.clientError("Email address already in use")];
                            user_id = idgen_1.makeId();
                            return [4 /*yield*/, sharp_1.default(pfp.buffer).jpeg({ quality: 80 }).toBuffer()];
                        case 2:
                            buffer = _b.sent();
                            return [4 /*yield*/, upload_1.uploadFile({ buffer: buffer, dir: "user/" + user_id + "/pfp/" })];
                        case 3:
                            url = _b.sent();
                            return [4 /*yield*/, bcrypt_1.default.genSalt(10)];
                        case 4:
                            salt = _b.sent();
                            _a = data;
                            return [4 /*yield*/, bcrypt_1.default.hash(data.password, salt)];
                        case 5:
                            _a.password = _b.sent();
                            teacher = new Teacher_1.Teachers({
                                full_name: data.full_name,
                                email: data.email,
                                school_id: admin.school_id,
                                password: data.password,
                                profile_picture_url: url,
                                gender: data.gender,
                                user_id: user_id,
                                email_verified: true,
                                teacher_verified: true
                            });
                            return [4 /*yield*/, teacher.save()];
                        case 6:
                            _b.sent();
                            return [2 /*return*/, jsonResponse.success(teacher)];
                        case 7:
                            error_6 = _b.sent();
                            console.log(error_6);
                            jsonResponse.serverError();
                            return [3 /*break*/, 8];
                        case 8: return [2 /*return*/];
                    }
                });
            }); });
        }
        catch (error) {
            console.log(error);
            jsonResponse.serverError();
        }
        return [2 /*return*/];
    });
}); };
exports.createTeacher = createTeacher;
