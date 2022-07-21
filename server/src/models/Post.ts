import { Schema, model } from "mongoose";
import { Post } from "@shared/Post"

const POSTCATEGORIES = [
    "Nepali",
    "English",
    "Science",
    "Mathematics",
    "Social Studies",
    "Environment, Population and Health (EPH)",
    "Computing",
    "Suggestion",
    "Career",
    "Other"
]

const schema = new Schema<Post>({
    post_type: {
        type: String,
        enum: ["text","image"],
        required: true
    },
    post_id: {
        type: String,
        required: true,
        unique: true,
    },
    author_id: {
        type: String,
        required: true,
    },
    school_id: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
        maxlength: 250
    },
    body: {
        type: String,
        required: false,
        maxlength: 10000,
    },
    content_src: {
        type: String,
        required: false,
    },
    category: {
        type: String,
        enum: POSTCATEGORIES
    },
    liked_by: {
        type: [String],
        required: false,
        default: []
    }
}, { timestamps: true });

const Post = model("post", schema)

export { Post }