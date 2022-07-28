"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Teachers = void 0;
var mongoose_1 = require("mongoose");
var schema = new mongoose_1.Schema({
    user_id: {
        required: true,
        type: String,
        unique: true,
    },
    email: {
        required: true,
        type: String,
        unique: true,
    },
    full_name: {
        required: true,
        type: String,
    },
    password: {
        required: true,
        type: String,
    },
    school_id: {
        required: true,
        type: String
    },
    profile_picture_url: {
        required: true,
        type: String
    },
    email_verified: {
        default: false,
        type: Boolean
    },
    teacher_verified: {
        default: false,
        type: Boolean
    },
}, { timestamps: true });
var Teachers = mongoose_1.model("Teacher", schema);
exports.Teachers = Teachers;
