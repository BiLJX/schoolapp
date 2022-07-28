"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Class = void 0;
var mongoose_1 = require("mongoose");
var ClassSchema = new mongoose_1.Schema({
    class_id: {
        type: String,
        required: true,
        unique: true
    },
    school_id: {
        type: String,
        required: true
    },
    grade: {
        type: Number,
        required: true
    },
    section: {
        type: String,
        required: true,
    }
}, { timestamps: true });
var Class = mongoose_1.model("class", ClassSchema);
exports.Class = Class;
