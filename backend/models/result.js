import mongoose from "mongoose";
const { Schema } = mongoose;

const resultSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        score: {
            type: Number,
            required: true,
        },

        answeredQuestions: {
            type: Map,
            of: mongoose.Schema.Types.Mixed,
            required: true,
        },

        questions: {
            type: [mongoose.Schema.Types.Mixed],
            required: true,
        },

        correctAnswers: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
);

const Result = mongoose.model("Result", resultSchema);

export default Result;
