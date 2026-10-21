import mongoose from "mongoose";
const Schema = mongoose.Schema;


const questionSchema = new Schema({
    question: {
        type: String,
        required: true,
        trim: true,
    },

    options: [
        {
            label: {
                type: String,
                required: true,
            },
            option: {
                type: String,
                required: true,
            },
        },
    ],

    correctAnswer: {
        type: String,
        required: true,
    },

    points: {
        type: Number,
        default: 10,
        min: 0,
    },

    explanation: {
        type: String,
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
},
    {
        timestamps: true,
    },
);


const Question = mongoose.model("Question", questionSchema);


export default Question;
