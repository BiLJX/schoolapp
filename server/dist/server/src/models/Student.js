"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Students = void 0;
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
    class_id: {
        required: true,
        type: String
    },
    school_id: {
        required: true,
        type: String
    },
    profile_picture_url: {
        required: true,
        type: String
    },
    gender: {
        required: true,
        type: String,
        enum: ["Male", "Female"]
    },
    mothers_email: {
        type: String,
        default: ""
    },
    fathers_email: {
        type: String,
        default: ""
    },
    email_verified: {
        default: false,
        type: Boolean
    },
    student_verified: {
        default: false,
        type: Boolean
    },
}, { timestamps: true });
var Students = mongoose_1.model("student", schema);
exports.Students = Students;
