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
exports.unlikeComment = exports.likeComment = exports.addReply = exports.addComment = exports.getComments = void 0;
var notificationHandler_1 = require("../handler/notificationHandler");
var Comment_1 = require("../models/Comment");
var Post_1 = require("../models/Post");
var idgen_1 = require("../utils/idgen");
var Response_1 = __importDefault(require("../utils/Response"));
var getComments = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var jsonResponse, currentUser, post_id, comments, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                jsonResponse = new Response_1.default(res);
                currentUser = res.locals.user;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                post_id = req.params.post_id;
                if (!post_id)
                    return [2 /*return*/, jsonResponse.notFound("Comments not found")];
                return [4 /*yield*/, Comment_1.Comments.aggregate([
                        {
                            $match: {
                                post_id: post_id
                            },
                        },
                        {
                            $lookup: {
                                from: "teachers",
                                foreignField: "user_id",
                                localField: "author_id",
                                as: "author_data_teacher",
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
                                path: "$author_data_teacher",
                                preserveNullAndEmptyArrays: true
                            }
                        },
                        {
                            $lookup: {
                                from: "students",
                                foreignField: "user_id",
                                localField: "author_id",
                                as: "author_data_student",
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
                                path: "$author_data_student",
                                preserveNullAndEmptyArrays: true
                            }
                        },
                        {
                            $addFields: {
                                likes_count: {
                                    $size: "$likes"
                                },
                                author_data: {
                                    $ifNull: ["$author_data_teacher", "$author_data_student", "$author_data_teacher"]
                                },
                                has_liked: {
                                    $in: [currentUser.user_id, "$likes"]
                                }
                            }
                        },
                        {
                            $project: {
                                author_data_student: 0,
                                author_data_teacher: 0
                            }
                        },
                        {
                            $sort: {
                                createdAt: -1
                            }
                        }
                    ])];
            case 2:
                comments = _a.sent();
                return [2 /*return*/, jsonResponse.success(comments)];
            case 3:
                error_1 = _a.sent();
                console.log(error_1);
                jsonResponse.serverError();
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getComments = getComments;
var addComment = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var jsonResponse, currentUser, text, post_id, notification, post, comment, _comment, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                jsonResponse = new Response_1.default(res);
                currentUser = res.locals.user;
                text = req.body.text;
                post_id = req.body.post_id;
                notification = req.app.locals.notification;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                if (!text)
                    return [2 /*return*/, jsonResponse.clientError("Please add a comment.")];
                text = text.trim();
                if (!post_id)
                    return [2 /*return*/, jsonResponse.clientError("Could not find any post.")];
                return [4 /*yield*/, Post_1.Post.findOne({ post_id: post_id })];
            case 2:
                post = _a.sent();
                if (!post)
                    return [2 /*return*/, jsonResponse.clientError("Could not find any post.")];
                comment = new Comment_1.Comments({
                    author_id: currentUser.user_id,
                    comment_id: idgen_1.makeId(),
                    text: text,
                    post_id: post_id,
                });
                return [4 /*yield*/, comment.save()];
            case 3:
                _comment = (_a.sent()).toJSON();
                _comment.author_data = {
                    user_type: currentUser.type,
                    full_name: currentUser.full_name,
                    user_id: currentUser.user_id,
                    profile_picture_url: currentUser.profile_picture_url
                };
                _comment.likes_count = 0;
                jsonResponse.success(_comment);
                if (post.author_id === currentUser.user_id)
                    return [2 /*return*/];
                return [4 /*yield*/, notification.notify({
                        type: notificationHandler_1.NotificationTypes.COMMENTED,
                        receiver_id: post.author_id,
                        sender_id: currentUser.user_id,
                        content: {
                            post_id: comment.post_id,
                            comment: comment.text
                        },
                        sender_data: {
                            full_name: currentUser.full_name,
                            type: currentUser.type,
                            profile_picture_url: currentUser.profile_picture_url
                        }
                    })];
            case 4:
                _a.sent();
                return [3 /*break*/, 6];
            case 5:
                error_2 = _a.sent();
                console.log(error_2);
                jsonResponse.serverError();
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.addComment = addComment;
var addReply = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var jsonResponse, currentUser, text, parent_id, notification, comment, reply, _reply, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                jsonResponse = new Response_1.default(res);
                currentUser = res.locals.user;
                text = req.body.text;
                parent_id = req.body.parent_id;
                notification = req.app.locals.notification;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                if (!text)
                    return [2 /*return*/, jsonResponse.clientError("Please add a reply.")];
                text = text.trim();
                return [4 /*yield*/, Comment_1.Comments.findOne({ comment_id: parent_id })];
            case 2:
                comment = _a.sent();
                if (!parent_id)
                    return [2 /*return*/, jsonResponse.clientError("Could not find any comment to reply on.")];
                if (!comment)
                    return [2 /*return*/, jsonResponse.clientError("Could not find any comment to reply on.")];
                reply = new Comment_1.Comments({
                    author_id: currentUser.user_id,
                    comment_id: idgen_1.makeId(),
                    text: text,
                    parent_id: parent_id,
                    post_id: comment.post_id
                });
                return [4 /*yield*/, reply.save()];
            case 3:
                _reply = (_a.sent()).toJSON();
                _reply.author_data = {
                    user_type: currentUser.type,
                    full_name: currentUser.full_name,
                    user_id: currentUser.user_id,
                    profile_picture_url: currentUser.profile_picture_url
                };
                _reply.likes_count = 0;
                jsonResponse.success(_reply);
                if (comment.author_id === reply.author_id)
                    return [2 /*return*/];
                return [4 /*yield*/, notification.notify({
                        type: notificationHandler_1.NotificationTypes.REPLIED,
                        receiver_id: comment.author_id,
                        sender_id: reply.author_id,
                        content: {
                            post_id: reply.post_id,
                            comment: reply.text
                        },
                        sender_data: {
                            full_name: currentUser.full_name,
                            type: currentUser.type,
                            profile_picture_url: currentUser.profile_picture_url
                        }
                    })];
            case 4:
                _a.sent();
                return [2 /*return*/];
            case 5:
                error_3 = _a.sent();
                console.log(error_3);
                jsonResponse.serverError();
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.addReply = addReply;
var likeComment = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var response, currentUser, comment_id, comment, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                response = new Response_1.default(res);
                currentUser = res.locals.user;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                comment_id = req.params.comment_id;
                return [4 /*yield*/, Comment_1.Comments.findOne({ comment_id: comment_id })];
            case 2:
                comment = _a.sent();
                if (!comment)
                    return [2 /*return*/, response.clientError("no comment found")];
                if (comment.likes.includes(currentUser.user_id))
                    return [2 /*return*/, response.clientError("You have already liked the comment")];
                return [4 /*yield*/, comment.updateOne({
                        $push: { likes: currentUser.user_id }
                    })];
            case 3:
                _a.sent();
                return [2 /*return*/, response.success()];
            case 4:
                error_4 = _a.sent();
                console.log(error_4);
                response.serverError();
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.likeComment = likeComment;
var unlikeComment = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var response, currentUser, comment_id, comment, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                response = new Response_1.default(res);
                currentUser = res.locals.user;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                comment_id = req.params.comment_id;
                return [4 /*yield*/, Comment_1.Comments.findOne({ comment_id: comment_id })];
            case 2:
                comment = _a.sent();
                if (!comment)
                    return [2 /*return*/, response.clientError("no comment found")];
                if (!comment.likes.includes(currentUser.user_id))
                    return [2 /*return*/, response.clientError("You have not liked the comment")];
                return [4 /*yield*/, comment.updateOne({
                        $pull: { likes: currentUser.user_id }
                    })];
            case 3:
                _a.sent();
                return [2 /*return*/, response.success()];
            case 4:
                error_5 = _a.sent();
                console.log(error_5);
                response.serverError();
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.unlikeComment = unlikeComment;
