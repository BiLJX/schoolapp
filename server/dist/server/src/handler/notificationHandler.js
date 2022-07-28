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
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationTypes = void 0;
var Notification_1 = require("../models/Notification");
var idgen_1 = require("../utils/idgen");
var NotificationTypes;
(function (NotificationTypes) {
    NotificationTypes[NotificationTypes["LIKED_POST"] = 0] = "LIKED_POST";
    NotificationTypes[NotificationTypes["COMMENTED"] = 1] = "COMMENTED";
    NotificationTypes[NotificationTypes["REPLIED"] = 2] = "REPLIED";
    NotificationTypes[NotificationTypes["NEW_ASSIGNMENT"] = 3] = "NEW_ASSIGNMENT";
    NotificationTypes[NotificationTypes["NEW_ANNOUNCEMENT"] = 4] = "NEW_ANNOUNCEMENT";
    NotificationTypes[NotificationTypes["INTERACTION"] = 5] = "INTERACTION";
})(NotificationTypes = exports.NotificationTypes || (exports.NotificationTypes = {}));
var NotificationHandler = /** @class */ (function () {
    function NotificationHandler(io) {
        this.io = io;
    }
    ;
    NotificationHandler.prototype.sendInteraction = function (notification_data) {
        return __awaiter(this, void 0, void 0, function () {
            var notificationDoc, notification, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        notification_data.type = NotificationTypes.INTERACTION;
                        notification_data.notification_id = idgen_1.makeId();
                        notificationDoc = new Notification_1.Notifications(notification_data);
                        return [4 /*yield*/, notificationDoc.save()];
                    case 1:
                        notification = (_a.sent()).toJSON();
                        notification.content = notification_data.title;
                        this.notify(notification);
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.log(error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    NotificationHandler.prototype.sendLike = function (notification_data, data) {
        return __awaiter(this, void 0, void 0, function () {
            var notificationDoc, notification, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        notification_data.content_id = data.post_id;
                        notification_data.type = NotificationTypes.LIKED_POST;
                        notification_data.notification_id = idgen_1.makeId();
                        notificationDoc = new Notification_1.Notifications(notification_data);
                        return [4 /*yield*/, notificationDoc.save()];
                    case 1:
                        notification = (_a.sent()).toJSON();
                        notification.content = data;
                        this.notify(notification);
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        console.log(error_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    NotificationHandler.prototype.sendComment = function (notification_data) {
        return __awaiter(this, void 0, void 0, function () {
            var notificationDoc, notification, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        notification_data.type = NotificationTypes.COMMENTED;
                        notification_data.notification_id = idgen_1.makeId();
                        notificationDoc = new Notification_1.Notifications(notification_data);
                        return [4 /*yield*/, notificationDoc.save()];
                    case 1:
                        notification = (_a.sent()).toJSON();
                        this.notify(notification);
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        console.log(error_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    NotificationHandler.prototype.sendReply = function (notification_data) {
        return __awaiter(this, void 0, void 0, function () {
            var notificationDoc, notification, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        notification_data.type = NotificationTypes.REPLIED;
                        notification_data.notification_id = idgen_1.makeId();
                        notificationDoc = new Notification_1.Notifications(notification_data);
                        return [4 /*yield*/, notificationDoc.save()];
                    case 1:
                        notification = (_a.sent()).toJSON();
                        this.notify(notification);
                        return [3 /*break*/, 3];
                    case 2:
                        error_4 = _a.sent();
                        console.log(error_4);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    NotificationHandler.prototype.notify = function (data) {
        this.io.to(data.receiver_id).emit("newNotification", data);
    };
    Object.defineProperty(NotificationHandler.prototype, "Types", {
        get: function () {
            return NotificationTypes;
        },
        enumerable: false,
        configurable: true
    });
    return NotificationHandler;
}());
exports.default = NotificationHandler;
