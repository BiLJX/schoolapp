"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssignmentLog = exports.Assignments = void 0;
var mongoose_1 = require("mongoose");
var schema = new mongoose_1.Schema({
    assignment_id: {
        type: String,
        required: true,
        unique: true
    },
    school_id: {
        type: String,
        required: true
    },
    assigned_by: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    due: {
        type: Date,
        required: true
    },
    points: {
        type: Number,
        required: true,
    },
    assigned_class: {
        type: [String],
        required: true
    },
    completed_by: {
        type: [String],
        default: [],
        required: false
    },
    redo_by: {
        type: [String],
        default: [],
        required: false
    }
}, { timestamps: true });
var schema2 = new mongoose_1.Schema({
    log_id: {
        type: String,
        required: true,
        unique: true
    },
    school_id: {
        type: String,
        required: true
    },
    assigned_by: {
        type: String,
        required: true
    },
    assignment_id: {
        type: String,
        required: true
    },
    points_gained: {
        type: Number,
        default: 0
    },
    log_type: {
        type: String,
        required: true,
        enum: ["completed", "redo"]
    },
    log_of: {
        type: String,
        required: true
    }
}, { timestamps: true });
var Assignments = mongoose_1.model("assignment", schema);
exports.Assignments = Assignments;
var AssignmentLog = mongoose_1.model("assignment_log", schema2);
exports.AssignmentLog = AssignmentLog;
