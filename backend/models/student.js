
import mongoose from "mongoose";
const { Schema } = mongoose;

const studentSchema = new Schema(
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
            enum: ["student"],
            default: "student",
            required: true,
        },
        course: {
            type: String,
            required: true,
            trim: true,
        },
        college: {
            type: String,
            required: true,
            trim: true,
        },
        session: {
            type: String,
            required: true,
            trim: true,
        },
        contactNo: {
            type: String,
            required: true,
            trim: true,
        },
    },
    { timestamps: true }
);


const Student = mongoose.model("Student", studentSchema);

export default Student;