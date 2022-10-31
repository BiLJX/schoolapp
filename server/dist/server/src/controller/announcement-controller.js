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
exports.getAnnouncements = exports.createAnnouncement = void 0;
var moment_1 = __importDefault(require("moment"));
var Announcement_1 = require("../models/Announcement");
var idgen_1 = require("../utils/idgen");
var Response_1 = __importDefault(require("../utils/Response"));
var validator_1 = require("../utils/validator");
var createAnnouncement = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var jsonResponse, admin, data, titleValidationResult, bodyValidationResult, announcement, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                jsonResponse = new Response_1.default(res);
                admin = res.locals.admin;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                data = req.body;
                data.body = data.body.trim();
                data.title = data.title.trim();
                titleValidationResult = validator_1.validatePostTitle(data.title);
                bodyValidationResult = validator_1.validatePostBody(data.body);
                if (!titleValidationResult.success)
                    return [2 /*return*/, jsonResponse.clientError(titleValidationResult.message)];
                if (!bodyValidationResult.success)
                    return [2 /*return*/, jsonResponse.clientError(bodyValidationResult.message)];
                if (!(data.is_announced_to_students || data.is_announced_to_teachers))
                    return [2 /*return*/, jsonResponse.clientError("Please select whom you want to announce.")];
                announcement = new Announcement_1.Announcements({
                    announcement_id: idgen_1.makeId(),
                    school_id: admin.school_id,
                    title: data.title.trim(),
                    body: data.body.trim(),
                    is_announced_to_students: data.is_announced_to_students,
                    is_announced_to_teachers: data.is_announced_to_teachers,
                    read_by: []
                });
                return [4 /*yield*/, announcement.save()];
            case 2:
                _a.sent();
                jsonResponse.success(announcement);
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
exports.createAnnouncement = createAnnouncement;
var getAnnouncements = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var jsonResponse, currentUser, announcements, _a, _b, error_2;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                jsonResponse = new Response_1.default(res);
                currentUser = res.locals.user;
                _c.label = 1;
            case 1:
                _c.trys.push([1, 4, , 5]);
                return [4 /*yield*/, Announcement_1.Announcements.aggregate([
                        {
                            $match: {
                                school_id: currentUser.school_id
                            }
                        },
                        {
                            $sort: {
                                createdAt: -1
                            }
                        },
                        {
                            $addFields: {
                                has_read: {
                                    $in: [currentUser.user_id, "$read_by"]
                                }
                            }
                        }
                    ])];
            case 2:
                announcements = _c.sent();
                announcements = announcements.map(function (x) {
                    x.given_on = moment_1.default(x.createdAt).format("Do MMMM YYYY");
                    return x;
                });
                _b = (_a = jsonResponse).success;
                return [4 /*yield*/, groupAnnouncement(announcements)];
            case 3:
                _b.apply(_a, [_c.sent()]);
                return [3 /*break*/, 5];
            case 4:
                error_2 = _c.sent();
                console.log(error_2);
                jsonResponse.serverError();
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.getAnnouncements = getAnnouncements;
var groupAnnouncement = function (announcements) { return __awaiter(void 0, void 0, void 0, function () {
    var map, _loop_1, _i, announcements_1, announcement, data;
    return __generator(this, function (_a) {
        map = {};
        _loop_1 = function (announcement) {
            if (!map[announcement.given_on]) {
                map[announcement.given_on] = announcements.filter(function (x) { return x.given_on === announcement.given_on; });
            }
        };
        for (_i = 0, announcements_1 = announcements; _i < announcements_1.length; _i++) {
            announcement = announcements_1[_i];
            _loop_1(announcement);
        }
        data = Object.keys(map).map(function (x) {
            return {
                given_on: x,
                items: map[x]
            };
        });
        return [2 /*return*/, data];
    });
}); };
