"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
var mongoose_1 = require("mongoose");
var POSTCATEGORIES = [
    "Nepali",
    "English",
    "Science",
    "Mathematics",
    "Social Studies",
    "Environment, Population and Health (EPH)",
    "Computing",
    "Suggestion",
    "Career",
    "Other"
];
var schema = new mongoose_1.Schema({
    post_type: {
        type: String,
        enum: ["text", "image"],
        required: true
    },
    post_id: {
        type: String,
        required: true,
        unique: true,
    },
    author_id: {
        type: String,
        required: true,
    },
    school_id: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
        maxlength: 250
    },
    body: {
        type: String,
        required: false,
        maxlength: 10000,
    },
    content_src: {
        type: String,
        required: false,
    },
    category: {
        type: String,
        enum: POSTCATEGORIES
    },
    liked_by: {
        type: [String],
        required: false,
        default: []
    }
}, { timestamps: true });
var Post = mongoose_1.model("post", schema);
exports.Post = Post;
