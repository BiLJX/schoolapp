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
exports.ApiRoutes = void 0;
var express_1 = require("express");
var admin_1 = require("../middleware/admin");
var user_1 = require("../middleware/user");
var admin_2 = require("./admin");
var auth_1 = require("./auth");
var comment_1 = require("./comment");
var posts_1 = require("./posts");
var school_1 = require("./school");
var user_2 = require("./user");
var nodemailer_1 = __importDefault(require("nodemailer"));
var interaction_1 = require("./interaction");
var teacher_1 = require("../middleware/teacher");
var inbox_1 = require("./inbox");
var router = express_1.Router();
exports.ApiRoutes = router;
router.use("/auth", auth_1.AuthRoutes);
router.use("/schools", school_1.SchoolRoutes);
router.use("/admin", admin_1.AdminAuth, admin_2.AdminRoutes);
router.use("/user", user_1.UserAuth, user_2.UserRoutes);
router.use("/post", user_1.UserAuth, posts_1.PostRoutes);
router.use("/comment", user_1.UserAuth, comment_1.CommentRoutes);
router.use("/inbox", user_1.UserAuth, inbox_1.InboxRoutes);
router.use("/interaction", user_1.UserAuth, teacher_1.TeacherAuth, interaction_1.InteractionRoutes);
router.get("/email", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var mail, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                mail = nodemailer_1.default.createTransport({
                    service: "gmail",
                    auth: {
                        user: "billjeshbaidya",
                        pass: "uaqwilhkjautgahp"
                    }
                });
                return [4 /*yield*/, mail.sendMail({
                        from: "DjBillje Official",
                        to: "billjesh.baidya_1391@euroschool.edu.np",
                        subject: "Test",
                        text: "Test"
                    })];
            case 1:
                _a.sent();
                res.status(200).json({ status: "ok" });
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.log(error_1);
                res.json(error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
