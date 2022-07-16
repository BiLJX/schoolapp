import { Student } from "@shared/User";
import { Schema, model } from "mongoose";

const schema = new Schema<Student>({
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
    email_verified: {
        default: false,
        type: Boolean
    },
    student_verified: {
        default: false,
        type: Boolean
    },
}, { timestamps: true })

const Students = model("student", schema);

export { Students }