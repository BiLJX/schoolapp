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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchExplore = exports.getTopStudents = void 0;
var Student_1 = require("../models/Student");
var Teacher_1 = require("../models/Teacher");
var Response_1 = __importDefault(require("../utils/Response"));
var WEIGHTS = {
    assignment_ratio: 1,
    assignment_points: 0.5,
    merits_ratio: 0.25,
    merits_difference: 0.5
};
var getTopStudents = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var jsonResponse, students, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                jsonResponse = new Response_1.default(res);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, Student_1.Students.aggregate([
                        {
                            $lookup: {
                                from: "assignment_logs",
                                as: "assignment_logs",
                                foreignField: "log_of",
                                localField: "user_id",
                                pipeline: [
                                    {
                                        $group: {
                                            _id: "$log_of",
                                            total_points: { $sum: "$points_gained" }
                                        }
                                    }
                                ]
                            }
                        },
                        {
                            $lookup: {
                                from: "interactions",
                                as: "merits",
                                localField: "user_id",
                                foreignField: "given_to",
                                pipeline: [
                                    {
                                        $match: {
                                            type: "merit"
                                        }
                                    },
                                    {
                                        $group: {
                                            _id: "$given_to",
                                            total_points: { $sum: "$amount" }
                                        }
                                    }
                                ]
                            }
                        },
                        {
                            $lookup: {
                                from: "interactions",
                                as: "demerits",
                                localField: "user_id",
                                foreignField: "given_to",
                                pipeline: [
                                    {
                                        $match: {
                                            type: "demerit"
                                        }
                                    },
                                    {
                                        $group: {
                                            _id: "$given_to",
                                            total_points: { $sum: "$amount" }
                                        }
                                    }
                                ]
                            }
                        },
                        {
                            $lookup: {
                                from: "assignments",
                                as: "given_assignments",
                                let: {
                                    class_id: "$class_id",
                                    user_id: "$user_id"
                                },
                                pipeline: [
                                    {
                                        $match: {
                                            $expr: {
                                                $and: [
                                                    { $in: ["$$class_id", "$assigned_class"] },
                                                ]
                                            }
                                        }
                                    },
                                    {
                                        $group: {
                                            _id: null,
                                            count: { $count: {} }
                                        }
                                    }
                                ]
                            }
                        },
                        {
                            $lookup: {
                                from: "assignments",
                                as: "completed_assignments",
                                let: {
                                    class_id: "$class_id",
                                    user_id: "$user_id"
                                },
                                pipeline: [
                                    {
                                        $match: {
                                            $expr: {
                                                $and: [
                                                    { $in: ["$$class_id", "$assigned_class"] },
                                                    { $in: ["$$user_id", "$completed_by"] }
                                                ]
                                            }
                                        }
                                    },
                                    {
                                        $group: {
                                            _id: null,
                                            count: { $count: {} }
                                        }
                                    }
                                ]
                            }
                        },
                        {
                            $unwind: {
                                path: "$merits",
                                preserveNullAndEmptyArrays: true
                            }
                        },
                        {
                            $unwind: {
                                path: "$demerits",
                                preserveNullAndEmptyArrays: true
                            }
                        },
                        {
                            $unwind: {
                                path: "$assignment_logs",
                                preserveNullAndEmptyArrays: true
                            }
                        },
                        {
                            $unwind: {
                                path: "$given_assignments",
                                preserveNullAndEmptyArrays: true
                            }
                        },
                        {
                            $unwind: {
                                path: "$completed_assignments",
                                preserveNullAndEmptyArrays: true
                            }
                        },
                        {
                            $addFields: {
                                WEIGHTS: WEIGHTS,
                                given_assignments_count: { $add: [{ $ifNull: ["$given_assignments.count", 0] }, 1] },
                                completed_assignments_count: { $ifNull: ["$completed_assignments.count", 0] }
                            }
                        },
                        {
                            $addFields: {
                                merits_ratio: { $divide: ["$merits.total_points", "$demerits.total_points"] },
                                merits_difference: { $subtract: ["$merits.total_points", "$demerits.total_points"] },
                                assignment_ratio: { $divide: ["$completed_assignments_count", "$given_assignments_count"] }
                            }
                        },
                        {
                            $addFields: {
                                merits_ratio_score: { $multiply: ["$merits_ratio", "$WEIGHTS.merits_ratio"] },
                                merits_difference_score: { $multiply: ["$merits_difference", "$WEIGHTS.merits_difference"] },
                                assignment_score: { $multiply: ["$assignment_logs.total_points", "$assignment_ratio"] },
                            }
                        },
                        {
                            $addFields: {
                                score: { $add: ["$assignment_score", "$merits_ratio_score", "$merits_difference_score"] },
                            }
                        },
                        {
                            $sort: {
                                score: -1
                            }
                        },
                        {
                            $addFields: {
                                assignment_points: "$assignment_logs.total_points",
                                merits_count: "$merits.total_points",
                                demerits_count: "$demerits.total_points",
                            }
                        },
                        {
                            $project: {
                                full_name: 1,
                                profile_picture_url: 1,
                                user_id: 1,
                                merits_count: 1,
                                demerits_count: 1,
                                assignment_points: 1
                            }
                        },
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
exports.getTopStudents = getTopStudents;
var searchExplore = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var jsonResponse, school_id, searchQuery, studentQuery, teacherQuery, _a, students, teacher, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                jsonResponse = new Response_1.default(res);
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                school_id = res.locals.user.school_id;
                searchQuery = req.query.s;
                if (!searchQuery)
                    return [2 /*return*/, jsonResponse.success([])];
                studentQuery = Student_1.Students.aggregate([
                    {
                        $match: {
                            full_name: { $regex: searchQuery, $options: 'i' },
                            school_id: school_id
                        }
                    },
                    {
                        $lookup: {
                            from: "interactions",
                            localField: "user_id",
                            foreignField: "given_to",
                            as: "merits_count",
                            pipeline: [
                                {
                                    $match: {
                                        type: "merit"
                                    }
                                }
                            ]
                        }
                    },
                    {
                        $lookup: {
                            from: "interactions",
                            localField: "user_id",
                            foreignField: "given_to",
                            as: "demerits_count",
                            pipeline: [
                                {
                                    $match: {
                                        type: "demerit"
                                    }
                                }
                            ]
                        }
                    },
                    {
                        $lookup: {
                            from: "classes",
                            localField: "class_id",
                            foreignField: "class_id",
                            as: "class",
                            pipeline: [
                                {
                                    $project: {
                                        section: 1,
                                        grade: 1
                                    }
                                }
                            ]
                        }
                    },
                    {
                        $unwind: {
                            path: "$school",
                            preserveNullAndEmptyArrays: true
                        }
                    },
                    {
                        $unwind: {
                            path: "$class",
                            preserveNullAndEmptyArrays: true
                        }
                    },
                    {
                        $addFields: {
                            merits_count: {
                                $size: "$merits_count"
                            },
                            demerits_count: {
                                $size: "$demerits_count"
                            },
                            type: "student"
                        }
                    },
                    {
                        $project: {
                            merits_count: 1,
                            demerits_count: 1,
                            profile_picture_url: 1,
                            full_name: 1,
                            school: 1,
                            class: 1,
                            user_id: 1,
                            type: 1
                        }
                    }
                ]);
                teacherQuery = Teacher_1.Teachers.aggregate([
                    {
                        $match: {
                            full_name: { $regex: searchQuery, $options: 'i' },
                            school_id: school_id
                        }
                    },
                    {
                        $addFields: {
                            type: "teacher"
                        }
                    },
                    {
                        $project: {
                            profile_picture_url: 1,
                            full_name: 1,
                            school: 1,
                            user_id: 1,
                            type: 1
                        }
                    }
                ]);
                return [4 /*yield*/, Promise.all([studentQuery, teacherQuery])];
            case 2:
                _a = _b.sent(), students = _a[0], teacher = _a[1];
                jsonResponse.success(__spreadArray(__spreadArray([], students), teacher));
                return [3 /*break*/, 4];
            case 3:
                error_2 = _b.sent();
                console.log(error_2);
                jsonResponse.serverError();
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.searchExplore = searchExplore;
