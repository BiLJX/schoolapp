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
exports.readNotification = exports.getActivity = exports.getInbox = void 0;
var notificationHandler_1 = require("../handler/notificationHandler");
var Assignment_1 = require("../models/Assignment");
var Notification_1 = require("../models/Notification");
var Response_1 = __importDefault(require("../utils/Response"));
var activity_filter = function (x) { return x.type === notificationHandler_1.NotificationTypes.LIKED_POST || x.type === notificationHandler_1.NotificationTypes.MERIT || x.type === notificationHandler_1.NotificationTypes.COMMENTED || x.type === notificationHandler_1.NotificationTypes.REPLIED || x.type === notificationHandler_1.NotificationTypes.DEMERIT; };
var announcement_filter = function (x) { return x.type === notificationHandler_1.NotificationTypes.NEW_ANNOUNCEMENT; };
var assignment_filter = function (x) { return x.type === notificationHandler_1.NotificationTypes.NEW_ASSIGNMENT; };
var getInbox = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var jsonResponse, assignments, currentUser, notifications, activity, announcement, inbox, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                jsonResponse = new Response_1.default(res);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                assignments = [];
                currentUser = res.locals.user;
                return [4 /*yield*/, Notification_1.Notifications.aggregate([
                        {
                            $match: { receiver_id: currentUser.user_id }
                        },
                        {
                            $lookup: {
                                from: "teachers",
                                foreignField: "user_id",
                                localField: "sender_id",
                                as: "sender_data_teacher",
                                pipeline: [
                                    {
                                        $project: {
                                            profile_picture_url: 1,
                                            full_name: 1,
                                            user_id: 1,
                                            user_type: 1
                                        }
                                    }
                                ]
                            }
                        },
                        {
                            $unwind: {
                                path: "$sender_data_teacher",
                                preserveNullAndEmptyArrays: true
                            }
                        },
                        {
                            $lookup: {
                                from: "students",
                                foreignField: "user_id",
                                localField: "sender_id",
                                as: "sender_data_student",
                                pipeline: [
                                    {
                                        $project: {
                                            profile_picture_url: 1,
                                            full_name: 1,
                                            user_id: 1,
                                            user_type: 1
                                        }
                                    }
                                ]
                            }
                        },
                        {
                            $unwind: {
                                path: "$sender_data_student",
                                preserveNullAndEmptyArrays: true
                            }
                        },
                        {
                            $addFields: {
                                sender_data: {
                                    $ifNull: ["$sender_data_teacher", "$sender_data_student", "$sender_data_teacher"]
                                },
                            }
                        },
                        {
                            $project: {
                                sender_data_student: 0,
                                sender_data_teacher: 0
                            }
                        },
                    ])];
            case 2:
                notifications = _a.sent();
                if (!(currentUser.type === "student")) return [3 /*break*/, 4];
                return [4 /*yield*/, Assignment_1.Assignments.aggregate([
                        {
                            $match: {
                                assigned_class: { $in: [currentUser.class_id] },
                                completed_by: { $not: { $in: [currentUser.user_id] } }
                            }
                        }
                    ])];
            case 3:
                assignments = _a.sent();
                _a.label = 4;
            case 4:
                activity = notifications.filter(activity_filter);
                announcement = notifications.filter(announcement_filter);
                inbox = {
                    activity: {
                        count: activity.filter(function (x) { return !x.has_read; }).length,
                        has_read: activity.every(function (x) { return x.has_read; }),
                    },
                    announcement: {
                        count: announcement.filter(function (x) { return !x.has_read; }).length,
                        has_read: announcement.every(function (x) { return x.has_read; }),
                    },
                    assignment: {
                        count: assignments.length,
                        has_read: assignments.length === 0,
                    }
                };
                return [2 /*return*/, jsonResponse.success(inbox)];
            case 5:
                error_1 = _a.sent();
                console.log(error_1);
                jsonResponse.serverError();
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.getInbox = getInbox;
var getActivity = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var jsonResponse, currentUser, notifications, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                jsonResponse = new Response_1.default(res);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                currentUser = res.locals.user;
                return [4 /*yield*/, Notification_1.Notifications.aggregate([
                        {
                            $match: {
                                receiver_id: currentUser.user_id,
                                type: {
                                    $in: [notificationHandler_1.NotificationTypes.LIKED_POST, notificationHandler_1.NotificationTypes.COMMENTED, notificationHandler_1.NotificationTypes.MERIT, notificationHandler_1.NotificationTypes.REPLIED, notificationHandler_1.NotificationTypes.DEMERIT]
                                }
                            }
                        },
                        {
                            $lookup: {
                                from: "teachers",
                                foreignField: "user_id",
                                localField: "sender_id",
                                as: "sender_data_teacher",
                                pipeline: [
                                    {
                                        $project: {
                                            profile_picture_url: 1,
                                            full_name: 1,
                                            user_id: 1,
                                            user_type: 1
                                        }
                                    }
                                ]
                            }
                        },
                        {
                            $unwind: {
                                path: "$sender_data_teacher",
                                preserveNullAndEmptyArrays: true
                            }
                        },
                        {
                            $lookup: {
                                from: "students",
                                foreignField: "user_id",
                                localField: "sender_id",
                                as: "sender_data_student",
                                pipeline: [
                                    {
                                        $project: {
                                            profile_picture_url: 1,
                                            full_name: 1,
                                            user_id: 1,
                                            user_type: 1
                                        }
                                    }
                                ]
                            }
                        },
                        {
                            $unwind: {
                                path: "$sender_data_student",
                                preserveNullAndEmptyArrays: true
                            }
                        },
                        {
                            $addFields: {
                                sender_data: {
                                    $ifNull: ["$sender_data_teacher", "$sender_data_student", "$sender_data_teacher"]
                                },
                            }
                        },
                        {
                            $project: {
                                sender_data_student: 0,
                                sender_data_teacher: 0
                            }
                        },
                        {
                            $sort: {
                                createdAt: -1
                            }
                        }
                    ])];
            case 2:
                notifications = _a.sent();
                jsonResponse.success(notifications);
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
exports.getActivity = getActivity;
var readNotification = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var jsonResponse, user_id, notification_id, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                jsonResponse = new Response_1.default(res);
                user_id = res.locals.user.user_id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                notification_id = req.params.id;
                return [4 /*yield*/, Notification_1.Notifications.findOneAndUpdate({ notification_id: notification_id, receiver_id: user_id }, {
                        $set: {
                            has_read: true
                        }
                    })];
            case 2:
                _a.sent();
                jsonResponse.success();
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
exports.readNotification = readNotification;
