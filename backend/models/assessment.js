
const mongoose = require("mongoose");
const { Schema } = mongoose;

const assessmentSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
            refPath: "userType",
        },
        userType: {
            type: String,
            required: true,
            enum: ["Student", "Teacher"],
        },
        category: {
            type: String,
            required: true,
            trim: true,
        },
        questionCount: {
            type: Number,
            required: true,
            min: 1,
        },
        duration: {
            type: Number,
            required: true,
            min: 1,
        },
        score: {
            type: Number,
            default: 0,
            min: 0,
        },
        status: {
            type: String,
            enum: ["in-progress", "completed"],
            default: "in-progress",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Assessment", assessmentSchema);
