import { model, Schema } from "mongoose";
import { ClassSchema } from "@shared/School"

const ClassSchema = new Schema<ClassSchema>({
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