import { model, Schema } from "mongoose";
import { Class } from "@shared/School"

const ClassSchema = new Schema<Class>({
    class_id: {
        type: String,
        required: true,
        unique: true
    },
    school_id: {
        type: String,
        required: true
    },
    grade: {
        type: Number,
        required: true
    },
    section: {
        type: String,
        required: true,
    }
}, { timestamps: true })

const Class = model("class", ClassSchema);

export { Class }