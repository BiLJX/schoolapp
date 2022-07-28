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
exports.giveInteraction = void 0;
var Interaction_1 = require("../models/Interaction");
var Student_1 = require("../models/Student");
var Response_1 = __importDefault(require("../utils/Response"));
var giveInteraction = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var jsonResponse, currentUser, notification, clientData, student, interaction, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                jsonResponse = new Response_1.default(res);
                currentUser = res.locals.user;
                notification = req.app.locals.notification;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                clientData = req.body;
                if (!clientData.reason)
                    return [2 /*return*/, jsonResponse.clientError("Please provide a reason!")];
                clientData.reason = clientData.reason.trim();
                if (clientData.reason.length < 3)
                    return [2 /*return*/, jsonResponse.clientError("Reason should be more than 3 charecters.")];
                return [4 /*yield*/, Student_1.Students.findOne({ user_id: clientData.given_to, school_id: currentUser.school_id })];
            case 2:
                student = _a.sent();
                if (!student)
                    return [2 /*return*/, jsonResponse.clientError("Student not found")];
                interaction = new Interaction_1.Interactions(__assign(__assign({}, clientData), { given_by: currentUser.user_id }));
                return [4 /*yield*/, interaction.save()];
            case 3:
                _a.sent();
                jsonResponse.success(null, "gave " + interaction.amount + " " + interaction.type + " to " + student.full_name);
                return [4 /*yield*/, notification.sendInteraction({
                        sender_id: currentUser.user_id,
                        receiver_id: clientData.given_to,
                        title: "gave you " + interaction.type,
                    })];
            case 4:
                _a.sent();
                return [3 /*break*/, 6];
            case 5:
                error_1 = _a.sent();
                console.log(error_1);
                jsonResponse.serverError();
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.giveInteraction = giveInteraction;
