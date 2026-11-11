
import mongoose from "mongoose"

const quizSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            default: "",
        },

        category: {
            type: String,
            required: true,
            trim: true,
        },

        syllabus: {
            type: String,
            default: "",
        },

        totalQuestions: {
            type: Number,
            required: true,
            min: 1,
        },

        pointsPerQuestion: {
            type: Number,
            required: true,
            min: 0,
        },

        negativeMarking: {
            type: Boolean,
            default: false,
        },

        negativeMarks: {
            type: Number,
            default: 0,
            min: 0,
        },

        difficulty: {
            type: String,
            enum: ["Easy", "Medium", "Hard"],
            default: "Medium",
        },

        timerEnabled: {
            type: Boolean,
            default: false,
        },

        duration: {
            type: Number,
            default: 0,
            min: 0,
        },

        scheduleEnabled: {
            type: Boolean,
            default: false,
        },

        startDate: {
            type: Date,
            default: null,
        },

        startTime: {
            type: String,
            default: "",
        },

        endDate: {
            type: Date,
            default: null,
        },

        endTime: {
            type: String,
            default: "",
        },

        rules: {
            type: String,
            default: "",
        },

        instructions: {
            type: String,
            default: "",
        },

        maximumMarks: {
            type: Number,
            default: 0,
        },

        status: {
            type: String,
            enum: ["Draft", "Published", "Completed", "Archived"],
            default: "Draft",
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

    },
    { timestamps: true }
);

const Quiz = mongoose.model("Quiz", quizSchema);

export default Quiz;
