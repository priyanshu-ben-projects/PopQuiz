
import mongoose from "mongoose";
const { Schema } = mongoose;

const teacherSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },
        accountType: {
            type: String,
            enum: ["teacher"],
            default: "teacher",
            required: true,
        },
        domain: {
            type: String,
            required: true,
            trim: true,
        },
        institution: {
            type: String,
            required: true,
            trim: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Teacher", teacherSchema);
