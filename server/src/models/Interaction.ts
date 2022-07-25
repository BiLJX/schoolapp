import { Schema, model } from "mongoose";
import { Interaction } from "@shared/StudentInteraction";

const schema = new Schema<Interaction>({
    given_by: {
        required: true,
        type: String
    },
    given_to: {
        required: true,
        type: String
    },
    type: {
        required: true,
        type: String,
        enum: ["merit", "demerit"]
    },
    reason: {
        required: true,
        type: String
    },
    amount: {
        required: false,
        type: Number,
        default: 1
    },
    given_on: {
        required: false,
        type: Date,
        default: new Date()
    }
}, {timestamps: true});

const Interactions = model("interaction", schema);
export { Interactions }