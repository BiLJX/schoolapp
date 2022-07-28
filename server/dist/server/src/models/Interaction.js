"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Interactions = void 0;
var mongoose_1 = require("mongoose");
var schema = new mongoose_1.Schema({
    given_by: {
        required: true,
        type: String
    },
    given_to: {
        required: true,
        type: String
    },
    type: {
        required: true,
        type: String,
        enum: ["merit", "demerit"]
    },
    reason: {
        required: true,
        type: String
    },
    amount: {
        required: false,
        type: Number,
        default: 1
    },
    given_on: {
        required: false,
        type: Date,
        default: new Date()
    }
}, { timestamps: true });
var Interactions = mongoose_1.model("interaction", schema);
exports.Interactions = Interactions;
