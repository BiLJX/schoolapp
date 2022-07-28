"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Schools = void 0;
var mongoose_1 = require("mongoose");
var schoolSchema = new mongoose_1.Schema({
    school_id: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        unique: true,
        required: true
    },
    logo_url: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });
var Schools = mongoose_1.model("school", schoolSchema);
exports.Schools = Schools;
