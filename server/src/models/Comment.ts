import { Comment } from "@shared/Post";
import { Schema, model } from "mongoose";

const schema = new Schema<Comment>({
    post_id: {
        required: true,
        type: String,
    },
    author_id: {
        required: true,
        type: String,
    },
    comment_id: {
        required: true,
        type: String,
        unique: true,
    },
    parent_id: {
        type: Schema.Types.Mixed,
        required: false,
        default: null
    },
    likes: {
        type: [String],
        required: false,
        default: []
    },
    text: {
        type: String,
        required: true
    },
}, {timestamps: true})

const Comments = model("comment", schema);
export { Comments }