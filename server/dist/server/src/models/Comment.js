"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comments = void 0;
var mongoose_1 = require("mongoose");
var schema = new mongoose_1.Schema({
    post_id: {
        required: true,
        type: String,
    },
    author_id: {
        required: true,
        type: String,
    },
    comment_id: {
        required: true,
        type: String,
        unique: true,
    },
    parent_id: {
        type: mongoose_1.Schema.Types.Mixed,
        required: false,
        default: null
    },
    likes: {
        type: [String],
        required: false,
        default: []
    },
    text: {
        type: String,
        required: true
    },
}, { timestamps: true });
var Comments = mongoose_1.model("comment", schema);
exports.Comments = Comments;
