"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notifications = void 0;
var mongoose_1 = require("mongoose");
var schema = new mongoose_1.Schema({
    notification_id: {
        type: String,
        required: true,
        unique: true,
    },
    type: {
        required: true,
        type: Number,
    },
    receiver_id: {
        type: String,
        required: true
    },
    sender_id: {
        type: String,
        required: true
    },
    has_read: {
        type: Boolean,
        required: false,
        default: false
    },
    title: {
        type: String,
        required: true
    },
    content_id: {
        type: mongoose_1.Schema.Types.Mixed,
        default: null,
        required: false
    },
    content: {
        type: String,
        required: false,
    }
}, { timestamps: true });
var Notifications = mongoose_1.model("notification", schema);
exports.Notifications = Notifications;
