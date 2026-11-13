
import mongoose from "mongoose";

const quizSchema = new mongoose.Schema(
    {
        // Basic Information
        title: {
            type: String,
            required: true,
            trim: true,
            maxlength: 100,
        },

        description: {
            type: String,
            default: "",
            maxlength: 500,
        },

        category: {
            type: String,
            required: true,
            trim: true,
            maxlength: 60,
        },

        syllabus: {
            type: String,
            default: "",
            maxlength: 2000,
        },

        // Assessment Settings
        totalQuestions: {
            type: Number,
            required: true,
            min: 1,
            max: 500,
        },

        pointsPerQuestion: {
            type: Number,
            required: true,
            min: 0.1,
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

        // Timer Settings
        timerEnabled: {
            type: Boolean,
            default: false,
        },

        duration: {
            type: Number,
            default: 0,
            min: 0,
            max: 600,
        },

        // Scheduling Settings
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

        // Rules & Instructions
        rules: {
            type: String,
            default: "",
            maxlength: 2000,
        },

        instructions: {
            type: String,
            default: "",
            maxlength: 1000,
        },

        // Quiz Information
        maximumMarks: {
            type: Number,
            default: 0,
            min: 0,
        },

        status: {
            type: String,
            enum: ["Draft", "Published", "Completed", "Archived"],
            default: "Draft",
        },
    },
    {
        timestamps: true,
    }
);

const Quiz = mongoose.model("Quiz", quizSchema);

export default Quiz;
