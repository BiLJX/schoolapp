import { Notification } from "@shared/Notification";
import { Schema, model } from "mongoose";
import { makeId } from "../utils/idgen";

const schema = new Schema<Notification>({
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
    content: {
        type: Schema.Types.Mixed,
        required: false,
    }
}, { timestamps: true })

const Notifications = model("notification", schema);

export { Notifications };