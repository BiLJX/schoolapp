import { Schema, model } from "mongoose";
import { Assignment } from "@shared/Assignment"
const schema = new Schema<Assignment>({
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

const Assignments = model("assignment", schema);
export { Assignments }