"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Announcements = void 0;
var mongoose_1 = require("mongoose");
var schema = new mongoose_1.Schema({
    announcement_id: {
        type: String,
        required: true,
        unique: true
    },
    school_id: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    read_by: {
        type: [String],
        default: []
    },
    is_announced_to_students: {
        type: Boolean,
        default: true
    },
    is_announced_to_teachers: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });
var Announcements = mongoose_1.model("announcement", schema);
exports.Announcements = Announcements;
