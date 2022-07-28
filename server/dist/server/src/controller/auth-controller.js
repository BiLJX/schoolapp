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
exports.teacherSignup = exports.teacherLogin = exports.studentLogin = exports.studentSignUp = exports.adminLogin = void 0;
var Response_1 = __importDefault(require("../utils/Response"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var School_1 = require("../models/School");
var secret_1 = require("../secret");
var upload_1 = require("../utils/upload");
var idgen_1 = require("../utils/idgen");
var validator_1 = require("../utils/validator");
var Class_1 = require("../models/Class");
var Student_1 = require("../models/Student");
var Teacher_1 = require("../models/Teacher");
var aggregations_1 = require("../utils/aggregations");
var expiresIn = 60 * 60 * 24 * 14 * 1000;
var options = { maxAge: expiresIn, httpOnly: false };
var adminLogin = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var jsonResponse, body, school, result, token, data, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                jsonResponse = new Response_1.default(res);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                body = req.body;
                return [4 /*yield*/, School_1.Schools.findOne({ name: body.school_name })];
            case 2:
                school = _a.sent();
                if (school === null)
                    return [2 /*return*/, jsonResponse.notFound("Couldnt Find Any School")];
                return [4 /*yield*/, bcrypt_1.default.compare(body.password, school.password)];
            case 3:
                result = _a.sent();
                if (!result)
                    return [2 /*return*/, jsonResponse.clientError("Invalid Password")];
                token = jsonwebtoken_1.default.sign({ school_id: school.school_id }, secret_1.SCHOOL_PASSWORD_SECRET, { expiresIn: "10d" });
                res.cookie("session", token, options);
                data = school.toJSON();
                delete data.password;
                jsonResponse.success(data, "Scucessfully logged in");
                return [3 /*break*/, 5];
            case 4:
                error_1 = _a.sent();
                console.log(error_1);
                jsonResponse.serverError();
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.adminLogin = adminLogin;
var studentSignUp = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var jsonResponse;
    return __generator(this, function (_a) {
        jsonResponse = new Response_1.default(res);
        upload_1.upload(req, res, function (err) { return __awaiter(void 0, void 0, void 0, function () {
            var data, files, pfp, nameValidation, emailValidation, passwordValidation, user, school, _class, user_id, url, salt, _a, student, token, _user, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (err)
                            return [2 /*return*/, jsonResponse.serverError()];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 10, , 11]);
                        data = req.body;
                        files = req.files;
                        pfp = files[0];
                        //reasign
                        data.email = data.email.trim().toLowerCase();
                        data.full_name = data.full_name.trim();
                        nameValidation = validator_1.validateFullName(data.full_name.trim().toLowerCase());
                        emailValidation = validator_1.validateEmail(data.email);
                        passwordValidation = validator_1.validatePassowrd(data.password);
                        if (!pfp.mimetype.includes("image"))
                            return [2 /*return*/, jsonResponse.clientError("Invalid file format")];
                        if (!nameValidation.success)
                            return [2 /*return*/, jsonResponse.clientError(nameValidation.message)];
                        if (!emailValidation.success)
                            return [2 /*return*/, jsonResponse.clientError(emailValidation.message)];
                        if (!passwordValidation.success)
                            return [2 /*return*/, jsonResponse.clientError(passwordValidation.message)];
                        return [4 /*yield*/, Student_1.Students.findOne({ email: data.email })];
                    case 2:
                        user = _b.sent();
                        if (user !== null)
                            return [2 /*return*/, jsonResponse.clientError("email address already in use")];
                        return [4 /*yield*/, School_1.Schools.findOne({ school_id: data.school_id })];
                    case 3:
                        school = _b.sent();
                        if (school === null)
                            return [2 /*return*/, jsonResponse.clientError("The School does not exist")];
                        return [4 /*yield*/, Class_1.Class.findOne({ class_id: data.class_id })];
                    case 4:
                        _class = _b.sent();
                        if (_class === null)
                            return [2 /*return*/, jsonResponse.clientError("The class does not exist")];
                        user_id = idgen_1.makeId();
                        return [4 /*yield*/, upload_1.uploadFile({ buffer: pfp.buffer, dir: "user/" + user_id + "/pfp/" })];
                    case 5:
                        url = _b.sent();
                        return [4 /*yield*/, bcrypt_1.default.genSalt(10)];
                    case 6:
                        salt = _b.sent();
                        _a = data;
                        return [4 /*yield*/, bcrypt_1.default.hash(data.password, salt)];
                    case 7:
                        _a.password = _b.sent();
                        student = new Student_1.Students(__assign(__assign({}, data), { profile_picture_url: url, user_id: user_id }));
                        return [4 /*yield*/, student.save()];
                    case 8:
                        _b.sent();
                        token = jsonwebtoken_1.default.sign({ user_id: student.user_id, type: "student" }, secret_1.USER_PASSWORD_SECRET, { expiresIn: "10d" });
                        res.cookie("user_session", token, options);
                        return [4 /*yield*/, Student_1.Students.aggregate(aggregations_1.studentAggregation({
                                $match: {
                                    user_id: student.user_id
                                }
                            }))];
                    case 9:
                        _user = _b.sent();
                        jsonResponse.success(_user[0]);
                        return [3 /*break*/, 11];
                    case 10:
                        error_2 = _b.sent();
                        console.log(error_2);
                        jsonResponse.serverError();
                        return [3 /*break*/, 11];
                    case 11: return [2 /*return*/];
                }
            });
        }); });
        return [2 /*return*/];
    });
}); };
exports.studentSignUp = studentSignUp;
var studentLogin = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var jsonResponse, _a, email, password, user, student, result, token, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                jsonResponse = new Response_1.default(res);
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                _a = req.body, email = _a.email, password = _a.password;
                return [4 /*yield*/, Student_1.Students.aggregate(aggregations_1.studentAggregation({
                        $match: {
                            email: email.toLowerCase()
                        }
                    }))];
            case 2:
                user = _b.sent();
                if (user.length < 1)
                    return [2 /*return*/, jsonResponse.clientError("Student not found")];
                student = user[0];
                return [4 /*yield*/, bcrypt_1.default.compare(password, student.password)];
            case 3:
                result = _b.sent();
                if (!result)
                    return [2 /*return*/, jsonResponse.clientError("Invalid password")];
                token = jsonwebtoken_1.default.sign({ user_id: student.user_id, type: "student" }, secret_1.USER_PASSWORD_SECRET, { expiresIn: "10d" });
                res.cookie("user_session", token, options);
                delete student.password;
                jsonResponse.success(student, "successfully logged in");
                return [3 /*break*/, 5];
            case 4:
                error_3 = _b.sent();
                console.log(error_3);
                jsonResponse.serverError();
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.studentLogin = studentLogin;
var teacherLogin = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var jsonResponse, _a, email, password, user, teacher, result, token, error_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                jsonResponse = new Response_1.default(res);
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                _a = req.body, email = _a.email, password = _a.password;
                return [4 /*yield*/, Teacher_1.Teachers.aggregate([
                        {
                            $match: {
                                email: email.toLowerCase()
                            }
                        },
                        {
                            $lookup: {
                                from: "schools",
                                localField: "school_id",
                                foreignField: "school_id",
                                as: "school",
                                pipeline: [
                                    {
                                        $project: {
                                            password: 0
                                        }
                                    }
                                ]
                            }
                        },
                        {
                            $unwind: {
                                path: "$school"
                            }
                        },
                    ])];
            case 2:
                user = _b.sent();
                if (user.length < 1)
                    return [2 /*return*/, jsonResponse.clientError("Teacher not found")];
                teacher = user[0];
                return [4 /*yield*/, bcrypt_1.default.compare(password, teacher.password)];
            case 3:
                result = _b.sent();
                if (!result)
                    return [2 /*return*/, jsonResponse.clientError("Invalid password")];
                token = jsonwebtoken_1.default.sign({ user_id: teacher.user_id, type: "teacher" }, secret_1.USER_PASSWORD_SECRET, { expiresIn: "10d" });
                res.cookie("user_session", token, options);
                delete teacher.password;
                jsonResponse.success(teacher, "successfully logged in");
                return [3 /*break*/, 5];
            case 4:
                error_4 = _b.sent();
                console.log(error_4);
                jsonResponse.serverError();
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.teacherLogin = teacherLogin;
var teacherSignup = function (req, res) {
    var jsonResponse = new Response_1.default(res);
    upload_1.upload(req, res, function (err) { return __awaiter(void 0, void 0, void 0, function () {
        var data, files, pfp, nameValidation, emailValidation, passwordValidation, user, school, user_id, url, salt, _a, teacher, token, _user, error_5;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (err)
                        return [2 /*return*/, jsonResponse.serverError()];
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 9, , 10]);
                    data = req.body;
                    files = req.files;
                    pfp = files[0];
                    //reasign
                    data.email = data.email.trim().toLowerCase();
                    nameValidation = validator_1.validateFullName(data.full_name.trim().toLowerCase());
                    emailValidation = validator_1.validateEmail(data.email);
                    passwordValidation = validator_1.validatePassowrd(data.password);
                    if (!pfp.mimetype.includes("image"))
                        return [2 /*return*/, jsonResponse.clientError("Invalid file format")];
                    if (!nameValidation.success)
                        return [2 /*return*/, jsonResponse.clientError(nameValidation.message)];
                    if (!emailValidation.success)
                        return [2 /*return*/, jsonResponse.clientError(emailValidation.message)];
                    if (!passwordValidation.success)
                        return [2 /*return*/, jsonResponse.clientError(passwordValidation.message)];
                    return [4 /*yield*/, Teacher_1.Teachers.findOne({ email: data.email })];
                case 2:
                    user = _b.sent();
                    if (user !== null)
                        return [2 /*return*/, jsonResponse.clientError("email address already in use")];
                    return [4 /*yield*/, School_1.Schools.findOne({ school_id: data.school_id })];
                case 3:
                    school = _b.sent();
                    if (school === null)
                        return [2 /*return*/, jsonResponse.clientError("The School does not exist")];
                    user_id = idgen_1.makeId();
                    return [4 /*yield*/, upload_1.uploadFile({ buffer: pfp.buffer, dir: "user/" + user_id + "/pfp/" })];
                case 4:
                    url = _b.sent();
                    return [4 /*yield*/, bcrypt_1.default.genSalt(10)];
                case 5:
                    salt = _b.sent();
                    _a = data;
                    return [4 /*yield*/, bcrypt_1.default.hash(data.password, salt)];
                case 6:
                    _a.password = _b.sent();
                    data.full_name = data.full_name.trim();
                    teacher = new Teacher_1.Teachers(__assign(__assign({}, data), { profile_picture_url: url, user_id: user_id }));
                    return [4 /*yield*/, teacher.save()];
                case 7:
                    _b.sent();
                    token = jsonwebtoken_1.default.sign({ user_id: teacher.user_id, type: "teacher" }, secret_1.USER_PASSWORD_SECRET, { expiresIn: "10d" });
                    res.cookie("user_session", token, options);
                    return [4 /*yield*/, Teacher_1.Teachers.aggregate([
                            {
                                $match: {
                                    user_id: teacher.user_id
                                }
                            },
                            {
                                $lookup: {
                                    from: "schools",
                                    localField: "school_id",
                                    foreignField: "school_id",
                                    as: "school",
                                    pipeline: [
                                        {
                                            $project: {
                                                password: 0
                                            }
                                        }
                                    ]
                                }
                            },
                            {
                                $project: {
                                    password: 0
                                }
                            },
                            {
                                $unwind: {
                                    path: "$school"
                                }
                            },
                        ])];
                case 8:
                    _user = _b.sent();
                    jsonResponse.success(_user[0]);
                    return [3 /*break*/, 10];
                case 9:
                    error_5 = _b.sent();
                    console.log(error_5);
                    jsonResponse.serverError();
                    return [3 /*break*/, 10];
                case 10: return [2 /*return*/];
            }
        });
    }); });
};
exports.teacherSignup = teacherSignup;
