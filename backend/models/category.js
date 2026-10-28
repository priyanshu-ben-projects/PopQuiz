
import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
    {
        category: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },

        about: {
            type: String,
            required: true,
            trim: true,
        },

        topics: {
            type: [{ type: String, trim: true }],
            default: [],
        },

        tools: {
            type: [{ type: String, trim: true }],
            default: [],
        },

        skills: {
            type: [{ type: String, trim: true }],
            default: [],
        },

        whyItMatters: {
            type: String,
            trim: true,
            default: "",
        },
    },
    { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);

export default Category;


