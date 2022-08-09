import { Schema, model } from "mongoose";
import { Assignment, AssignmentLog } from "@shared/Assignment"
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

const schema2 = new Schema<AssignmentLog>({
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
    log_type: {
        type: String,
        required: true,
        enum: ["completed", "redo"]
    },
    log_of: {
        type: String,
        required: true
    }
})

const Assignments = model("assignment", schema);
const AssignmentLog = model("assignment_log", schema2);
export { Assignments, AssignmentLog};