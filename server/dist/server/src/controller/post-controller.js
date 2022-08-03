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
exports.deletePost = exports.unlikePost = exports.likePost = exports.uploadPost = exports.getPostByUserId = exports.getPostById = exports.getFeedPost = void 0;
var idgen_1 = require("../utils/idgen");
var Response_1 = __importDefault(require("../utils/Response"));
var upload_1 = require("../utils/upload");
var validator_1 = require("../utils/validator");
var Post_1 = require("../models/Post");
var sharp_1 = __importDefault(require("sharp"));
var Comment_1 = require("../models/Comment");
var Notification_1 = require("../models/Notification");
var getFeedPost = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var jsonResponse, currentUser, posts, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                jsonResponse = new Response_1.default(res);
                currentUser = res.locals.user;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, Post_1.Post.aggregate([
                        {
                            $match: {
                                school_id: currentUser.school_id
                            }
                        },
                        {
                            $lookup: {
                                from: "comments",
                                localField: "post_id",
                                foreignField: "post_id",
                                as: "comments"
                            }
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
                                        }
                                    },
                                    {
                                        $addFields: {
                                            type: "teacher"
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
                                        }
                                    },
                                    {
                                        $addFields: {
                                            type: "student"
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
                                comment_count: {
                                    $size: "$comments"
                                },
                                like_count: {
                                    $size: "$liked_by"
                                },
                                author_data: {
                                    $ifNull: ["$author_data_teacher", "$author_data_student", "$author_data_teacher"]
                                },
                                has_liked: {
                                    $in: [currentUser.user_id, "$liked_by"]
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
                posts = _a.sent();
                jsonResponse.success(posts);
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
exports.getFeedPost = getFeedPost;
var getPostById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var jsonResponse, currentUser, post_id, posts, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                jsonResponse = new Response_1.default(res);
                currentUser = res.locals.user;
                post_id = req.params.post_id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                if (!post_id)
                    return [2 /*return*/, jsonResponse.notFound("post not found :(")];
                return [4 /*yield*/, Post_1.Post.aggregate([
                        {
                            $match: {
                                school_id: currentUser.school_id,
                                post_id: post_id
                            }
                        },
                        {
                            $lookup: {
                                from: "comments",
                                localField: "post_id",
                                foreignField: "post_id",
                                as: "comments"
                            }
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
                                        }
                                    },
                                    {
                                        $addFields: {
                                            type: "teacher"
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
                                        }
                                    },
                                    {
                                        $addFields: {
                                            type: "teacher"
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
                                like_count: {
                                    $size: "$liked_by"
                                },
                                comment_count: {
                                    $size: "$comments"
                                },
                                author_data: {
                                    $ifNull: ["$author_data_teacher", "$author_data_student", "$author_data_teacher"]
                                },
                                has_liked: {
                                    $in: [currentUser.user_id, "$liked_by"]
                                }
                            }
                        },
                        {
                            $project: {
                                author_data_student: 0,
                                author_data_teacher: 0,
                                comments: 0
                            }
                        },
                        {
                            $sort: {
                                createdAt: -1
                            }
                        }
                    ])];
            case 2:
                posts = _a.sent();
                if (!posts[0])
                    return [2 /*return*/, jsonResponse.notFound("Post not found :(")];
                jsonResponse.success(posts[0]);
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
exports.getPostById = getPostById;
var getPostByUserId = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var jsonResponse, currentUser, user_id, posts, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                jsonResponse = new Response_1.default(res);
                currentUser = res.locals.user;
                user_id = req.params.user_id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                if (!user_id)
                    return [2 /*return*/, jsonResponse.notFound("user not found")];
                return [4 /*yield*/, Post_1.Post.aggregate([
                        {
                            $match: {
                                school_id: currentUser.school_id,
                                author_id: user_id,
                            }
                        },
                        {
                            $lookup: {
                                from: "comments",
                                localField: "post_id",
                                foreignField: "post_id",
                                as: "comments"
                            }
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
                                        }
                                    },
                                    {
                                        $addFields: {
                                            type: "teacher"
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
                                        }
                                    },
                                    {
                                        $addFields: {
                                            type: "teacher"
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
                                like_count: {
                                    $size: "$liked_by"
                                },
                                comment_count: {
                                    $size: "$comments"
                                },
                                author_data: {
                                    $ifNull: ["$author_data_teacher", "$author_data_student", "$author_data_teacher"]
                                },
                                has_liked: {
                                    $in: [currentUser.user_id, "$liked_by"]
                                }
                            }
                        },
                        {
                            $project: {
                                author_data_student: 0,
                                author_data_teacher: 0,
                                comments: 0
                            }
                        },
                        {
                            $sort: {
                                createdAt: -1
                            }
                        }
                    ])];
            case 2:
                posts = _a.sent();
                jsonResponse.success(posts);
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
exports.getPostByUserId = getPostByUserId;
var uploadPost = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var jsonResponse, currentUser;
    return __generator(this, function (_a) {
        jsonResponse = new Response_1.default(res);
        currentUser = res.locals.user;
        upload_1.upload(req, res, function (err) { return __awaiter(void 0, void 0, void 0, function () {
            var data, files, picture, post_id, titleValid, bodyValid, post, _post, buffer, url, post, _post, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        if (err)
                            return [2 /*return*/, jsonResponse.serverError()];
                        data = req.body;
                        files = req.files;
                        picture = files[0];
                        post_id = idgen_1.makeId();
                        titleValid = validator_1.validatePostTitle(data.title);
                        if (!titleValid.success)
                            return [2 /*return*/, jsonResponse.clientError(titleValid.message)];
                        if (!("body" in data && !picture)) return [3 /*break*/, 2];
                        bodyValid = validator_1.validatePostBody(data.body);
                        if (!bodyValid.success)
                            return [2 /*return*/, jsonResponse.clientError(bodyValid.message)];
                        post = new Post_1.Post(__assign(__assign({}, data), { post_id: post_id, school_id: currentUser.school_id, author_id: currentUser.user_id, post_type: "text" }));
                        return [4 /*yield*/, post.save()];
                    case 1:
                        _post = (_a.sent()).toJSON();
                        _post.author_data = {
                            full_name: currentUser.full_name,
                            profile_picture_url: currentUser.profile_picture_url,
                            type: currentUser.type,
                            user_id: currentUser.user_id
                        };
                        jsonResponse.success(_post);
                        return [2 /*return*/];
                    case 2:
                        if (!picture.mimetype.includes("image"))
                            return [2 /*return*/, jsonResponse.clientError("Invalid file format")];
                        return [4 /*yield*/, sharp_1.default(picture.buffer).jpeg({ quality: 80 }).toBuffer()];
                    case 3:
                        buffer = _a.sent();
                        return [4 /*yield*/, upload_1.uploadFile({ buffer: buffer, replace: false, dir: "user/" + currentUser.user_id + "/post/" + post_id })];
                    case 4:
                        url = _a.sent();
                        post = new Post_1.Post(__assign(__assign({}, data), { post_type: "image", body: null, post_id: post_id, school_id: currentUser.school_id, author_id: currentUser.user_id, content_src: url }));
                        return [4 /*yield*/, post.save()];
                    case 5:
                        _post = (_a.sent()).toJSON();
                        _post.author_data = {
                            full_name: currentUser.full_name,
                            profile_picture_url: currentUser.profile_picture_url,
                            type: currentUser.type,
                            user_id: currentUser.user_id
                        };
                        _post.like_count = 0;
                        _post.has_liked = false;
                        jsonResponse.success(_post);
                        return [2 /*return*/];
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        error_4 = _a.sent();
                        console.log(error_4);
                        jsonResponse.serverError();
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        }); });
        return [2 /*return*/];
    });
}); };
exports.uploadPost = uploadPost;
var likePost = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var jsonResponse, currentUser, post_id, notification, post, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                jsonResponse = new Response_1.default(res);
                currentUser = res.locals.user;
                post_id = req.params.post_id;
                notification = req.app.locals.notification;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                console.time("like");
                return [4 /*yield*/, Post_1.Post.findOne({ post_id: post_id })];
            case 2:
                post = _a.sent();
                if (!post)
                    return [2 /*return*/, jsonResponse.notFound("Post not found")];
                if (post.liked_by.includes(currentUser.user_id))
                    return [2 /*return*/, jsonResponse.clientError("Already liked")];
                return [4 /*yield*/, post.updateOne({
                        $push: {
                            liked_by: currentUser.user_id
                        }
                    })];
            case 3:
                _a.sent();
                jsonResponse.success();
                console.timeEnd("like");
                if (post.author_id === currentUser.user_id)
                    return [2 /*return*/];
                return [4 /*yield*/, notification.notify({
                        receiver_id: post.author_id,
                        sender_id: currentUser.user_id,
                        type: notification.Types.LIKED_POST,
                        content: {
                            post_id: post.post_id,
                        },
                        sender_data: {
                            full_name: currentUser.user_id,
                            profile_picture_url: currentUser.profile_picture_url,
                            type: currentUser.type
                        }
                    })];
            case 4:
                _a.sent();
                return [3 /*break*/, 6];
            case 5:
                error_5 = _a.sent();
                console.log(error_5);
                jsonResponse.serverError();
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.likePost = likePost;
var unlikePost = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var jsonResponse, currentUser, post_id, notification, post, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                jsonResponse = new Response_1.default(res);
                currentUser = res.locals.user;
                post_id = req.params.post_id;
                notification = req.app.locals.notification;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                return [4 /*yield*/, Post_1.Post.findOne({ post_id: post_id })];
            case 2:
                post = _a.sent();
                if (!post)
                    return [2 /*return*/, jsonResponse.notFound("Post not found")];
                if (!post.liked_by.includes(currentUser.user_id))
                    return [2 /*return*/, jsonResponse.clientError("Post has not been liked.")];
                return [4 /*yield*/, post.updateOne({
                        $pull: {
                            liked_by: currentUser.user_id
                        }
                    })];
            case 3:
                _a.sent();
                jsonResponse.success();
                if (post.author_id === currentUser.user_id)
                    return [2 /*return*/];
                return [4 /*yield*/, Notification_1.Notifications.deleteMany({ receiver_id: post.author_id, sender_id: currentUser.user_id, content_id: post.post_id, type: notification.Types.LIKED_POST })];
            case 4:
                _a.sent();
                return [3 /*break*/, 6];
            case 5:
                error_6 = _a.sent();
                console.log(error_6);
                jsonResponse.serverError();
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.unlikePost = unlikePost;
var deletePost = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var jsonResponse, currentUser, post_id, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                jsonResponse = new Response_1.default(res);
                currentUser = res.locals.user;
                post_id = req.params.post_id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, Post_1.Post.deleteOne({ post_id: post_id, author_id: currentUser.user_id })];
            case 2:
                _a.sent();
                return [4 /*yield*/, Comment_1.Comments.deleteMany({ post_id: post_id })];
            case 3:
                _a.sent();
                jsonResponse.success();
                return [3 /*break*/, 5];
            case 4:
                error_7 = _a.sent();
                console.log(error_7);
                jsonResponse.serverError();
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.deletePost = deletePost;
