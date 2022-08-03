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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStudentMDOverall = exports.getStudentDemeritsPerformance = exports.getStudentMeritsPerformance = exports.getTeacherById = exports.getStudentById = exports.getCurrentUser = void 0;
var Interaction_1 = require("../models/Interaction");
var Student_1 = require("../models/Student");
var Teacher_1 = require("../models/Teacher");
var aggregations_1 = require("../utils/aggregations");
var Response_1 = __importDefault(require("../utils/Response"));
var moment_1 = __importDefault(require("moment"));
var getCurrentUser = function (req, res) {
    var jsonResponse = new Response_1.default(res);
    try {
        var user = res.locals.user;
        jsonResponse.success(user);
    }
    catch (error) {
        console.log(error);
        jsonResponse.serverError();
    }
};
exports.getCurrentUser = getCurrentUser;
var getStudentById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var jsonResponse, user_id, users, user, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                jsonResponse = new Response_1.default(res);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                user_id = req.params.user_id;
                return [4 /*yield*/, Student_1.Students.aggregate(aggregations_1.studentAggregation({ $match: {
                            user_id: user_id
                        } }))];
            case 2:
                users = _a.sent();
                user = users[0];
                if (user) {
                    user.type = "student";
                    return [2 /*return*/, jsonResponse.success(user)];
                }
                jsonResponse.notFound("Student not found.");
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
exports.getStudentById = getStudentById;
var getTeacherById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var jsonResponse, user_id, users, user, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                jsonResponse = new Response_1.default(res);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                user_id = req.params.user_id;
                return [4 /*yield*/, Teacher_1.Teachers.aggregate([
                        {
                            $match: {
                                user_id: user_id
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
                users = _a.sent();
                user = users[0];
                if (user) {
                    user.type = "teacher";
                    return [2 /*return*/, jsonResponse.success(user)];
                }
                jsonResponse.notFound("Teacher not found.");
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
exports.getTeacherById = getTeacherById;
var getStudentMeritsPerformance = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var jsonResponse, periods, time_period, user_id, agg, group, merits, performance_data, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                jsonResponse = new Response_1.default(res);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                periods = ["WEEK", "MONTH", "YEAR"];
                time_period = req.query.time_period;
                if (!periods.includes(time_period))
                    return [2 /*return*/, jsonResponse.clientError("Invalid time period")];
                user_id = req.params.user_id;
                agg = aggregations_1.performanceAggregation({ given_to: user_id, type: "merit" }, time_period);
                group = time_period === "YEAR" ? ({
                    $group: {
                        _id: { $month: "$given_on" },
                        total: { $sum: "$amount" }
                    }
                }) : ({
                    $group: {
                        _id: { $dayOfMonth: "$given_on" },
                        total: { $sum: "$amount" }
                    }
                });
                return [4 /*yield*/, Interaction_1.Interactions.aggregate(__spreadArray(__spreadArray([], agg), [
                        __assign({}, group),
                        {
                            $sort: { _id: 1 }
                        }
                    ]))];
            case 2:
                merits = _a.sent();
                performance_data = void 0;
                switch (time_period) {
                    case "WEEK":
                        performance_data = {
                            name: "Merits Obtained in",
                            labels: merits.map(function (x) { return "" + x._id; }),
                            data: merits.map(function (x) { return x.total; })
                        };
                        break;
                    case "MONTH":
                        performance_data = {
                            name: "Merits Obtained in",
                            labels: merits.map(function (x) { return moment_1.default(new Date()).format("MMM") + " " + x._id; }),
                            data: merits.map(function (x) { return x.total; })
                        };
                        break;
                    case "YEAR":
                        performance_data = {
                            name: "Merits Obtained in",
                            labels: merits.map(function (x) { return "" + moment_1.default(x._id, "M").format("MMM"); }),
                            data: merits.map(function (x) { return x.total; })
                        };
                        break;
                }
                jsonResponse.success(performance_data);
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
exports.getStudentMeritsPerformance = getStudentMeritsPerformance;
var getStudentDemeritsPerformance = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var jsonResponse, periods, time_period, user_id, agg, group, demerits, performance_data, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                jsonResponse = new Response_1.default(res);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                periods = ["WEEK", "MONTH", "YEAR"];
                time_period = req.query.time_period;
                if (!periods.includes(time_period))
                    return [2 /*return*/, jsonResponse.clientError("Invalid time period")];
                user_id = req.params.user_id;
                agg = aggregations_1.performanceAggregation({ given_to: user_id, type: "demerit" }, time_period);
                group = time_period === "YEAR" ? ({
                    $group: {
                        _id: { $month: "$given_on" },
                        total: { $sum: "$amount" }
                    }
                }) : ({
                    $group: {
                        _id: { $dayOfMonth: "$given_on" },
                        total: { $sum: "$amount" }
                    }
                });
                return [4 /*yield*/, Interaction_1.Interactions.aggregate(__spreadArray(__spreadArray([], agg), [
                        __assign({}, group),
                        {
                            $sort: { _id: 1 }
                        }
                    ]))];
            case 2:
                demerits = _a.sent();
                performance_data = void 0;
                switch (time_period) {
                    case "WEEK":
                        performance_data = {
                            name: "Demerits Obtained in",
                            labels: demerits.map(function (x) { return "" + x._id; }),
                            data: demerits.map(function (x) { return x.total; })
                        };
                        break;
                    case "MONTH":
                        performance_data = {
                            name: "Demerits Obtained in",
                            labels: demerits.map(function (x) { return moment_1.default(new Date()).format("MMM") + " " + x._id; }),
                            data: demerits.map(function (x) { return x.total; })
                        };
                        break;
                    case "YEAR":
                        performance_data = {
                            name: "Demerits Obtained in",
                            labels: demerits.map(function (x) { return "" + moment_1.default(x._id, "M").format("MMM"); }),
                            data: demerits.map(function (x) { return x.total; })
                        };
                        break;
                }
                jsonResponse.success(performance_data);
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
exports.getStudentDemeritsPerformance = getStudentDemeritsPerformance;
var getStudentMDOverall = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var jsonResponse, user_id, total_interactions, merits_sum, demerits_sum, _i, total_interactions_1, x, ratio, difference, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                jsonResponse = new Response_1.default(res);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                user_id = req.params.user_id;
                return [4 /*yield*/, Interaction_1.Interactions.find({ given_to: user_id }).lean()];
            case 2:
                total_interactions = _a.sent();
                merits_sum = 0;
                demerits_sum = 0;
                for (_i = 0, total_interactions_1 = total_interactions; _i < total_interactions_1.length; _i++) {
                    x = total_interactions_1[_i];
                    if (x.type === "merit")
                        merits_sum += x.amount;
                    else
                        demerits_sum += x.amount;
                }
                ;
                if (demerits_sum === 0)
                    demerits_sum = 1;
                ratio = (merits_sum / demerits_sum).toFixed(2);
                difference = merits_sum - demerits_sum;
                return [2 /*return*/, jsonResponse.success({ ratio: ratio, difference: difference })];
            case 3:
                error_5 = _a.sent();
                console.log(error_5);
                jsonResponse.serverError();
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getStudentMDOverall = getStudentMDOverall;
