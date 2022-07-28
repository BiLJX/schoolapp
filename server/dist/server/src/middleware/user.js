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
exports.UserAuth = void 0;
var Response_1 = __importDefault(require("../utils/Response"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var secret_1 = require("../secret");
var Student_1 = require("../models/Student");
var Teacher_1 = require("../models/Teacher");
var aggregations_1 = require("../utils/aggregations");
var UserAuth = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var jsonResponse, session, decodedData, user, _user, _user, student, teacher, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                jsonResponse = new Response_1.default(res);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 6, , 7]);
                session = req.cookies.user_session;
                if (!session)
                    return [2 /*return*/, jsonResponse.notAuthorized()];
                decodedData = jsonwebtoken_1.default.verify(session, secret_1.USER_PASSWORD_SECRET);
                user = void 0;
                if (!(decodedData.type === "student")) return [3 /*break*/, 3];
                return [4 /*yield*/, Student_1.Students.aggregate(aggregations_1.studentAggregation({
                        $match: {
                            user_id: decodedData.user_id
                        }
                    }))];
            case 2:
                _user = _a.sent();
                user = _user[0];
                if (user)
                    user.type = "student";
                return [3 /*break*/, 5];
            case 3: return [4 /*yield*/, Teacher_1.Teachers.aggregate([
                    {
                        $match: {
                            user_id: decodedData.user_id
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
            case 4:
                _user = _a.sent();
                user = _user[0];
                if (user)
                    user.type = "teacher";
                _a.label = 5;
            case 5:
                student = user;
                teacher = user;
                if (!user)
                    return [2 /*return*/, jsonResponse.notAuthorized()];
                if (!(student.student_verified || teacher.teacher_verified))
                    return [2 /*return*/, jsonResponse.clientError("Not verified", user)];
                res.locals.user = user;
                next();
                return [3 /*break*/, 7];
            case 6:
                error_1 = _a.sent();
                console.log(error_1);
                jsonResponse.serverError();
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.UserAuth = UserAuth;
