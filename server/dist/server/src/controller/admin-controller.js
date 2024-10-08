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
exports.Classes = exports.getCurrentAdmin = void 0;
var Class_1 = require("../models/Class");
var idgen_1 = require("../utils/idgen");
var Response_1 = __importDefault(require("../utils/Response"));
var firebase_admin_1 = __importDefault(require("firebase-admin"));
var st = firebase_admin_1.default.storage();
var getCurrentAdmin = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var jsonResponse, admin_1;
    return __generator(this, function (_a) {
        jsonResponse = new Response_1.default(res);
        try {
            admin_1 = res.locals.admin;
            jsonResponse.success(admin_1);
        }
        catch (error) {
            console.log(error);
            jsonResponse.serverError();
        }
        return [2 /*return*/];
    });
}); };
exports.getCurrentAdmin = getCurrentAdmin;
var Classes;
(function (Classes) {
    var _this = this;
    Classes.getClasses = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var jsonResponse, admin_2, classes, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    jsonResponse = new Response_1.default(res);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    admin_2 = res.locals.admin;
                    return [4 /*yield*/, Class_1.Class.aggregate([
                            {
                                $match: {
                                    school_id: admin_2.school_id
                                }
                            },
                            {
                                $sort: {
                                    grade: 1
                                }
                            }
                        ])];
                case 2:
                    classes = _a.sent();
                    return [2 /*return*/, jsonResponse.success(classes)];
                case 3:
                    error_1 = _a.sent();
                    console.log(error_1);
                    jsonResponse.serverError();
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    Classes.addClasses = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var jsonResponse, _a, grade, section, admin_3, _class, error_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    jsonResponse = new Response_1.default(res);
                    _a = req.body, grade = _a.grade, section = _a.section;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    if (typeof grade !== "number")
                        return [2 /*return*/, jsonResponse.clientError("Classes must be a number")];
                    admin_3 = res.locals.admin;
                    _class = new Class_1.Class({
                        class_id: idgen_1.makeId(),
                        school_id: admin_3.school_id,
                        grade: grade,
                        section: section
                    });
                    return [4 /*yield*/, _class.save()];
                case 2:
                    _b.sent();
                    jsonResponse.success(_class.toJSON(), "successfully created new class");
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
    Classes.removeClass = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var jsonResponse, class_id, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    jsonResponse = new Response_1.default(res);
                    class_id = req.params.class_id;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, Class_1.Class.findOneAndDelete({ class_id: class_id })];
                case 2:
                    _a.sent();
                    jsonResponse.success({}, "successfully removed class");
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
})(Classes = exports.Classes || (exports.Classes = {}));
