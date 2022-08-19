import { model, Schema } from "mongoose"
import { Announcement } from "../../../shared/Announcement"
const schema = new Schema<Announcement>({
    announcement_id: {
        type: String,
        required: true,
        unique: true
    },
    school_id: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    read_by: {
        type: [String],
        default: []
    },
    is_announced_to_students: {
        type: Boolean,
        default: true
    },
    is_announced_to_teachers: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})

const Announcements = model("announcement", schema);
export { Announcements }