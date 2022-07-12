import { model, Schema } from "mongoose";
import { School } from "@shared/School"

const schoolSchema = new Schema<School>({
    school_id: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        unique: true,
        required: true
    },
    logo_url: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true })

const Schools = model("school", schoolSchema);

export { Schools }