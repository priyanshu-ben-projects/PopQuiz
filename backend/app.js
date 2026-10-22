import dotenv from "dotenv";
if (process.env.NODE_ENV !== "production") {
    dotenv.config();
}

import mongoose from 'mongoose';
import express from 'express';
import path from 'path';
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();
const MONGO_URL = 'mongodb://localhost:27017/popQuiz';
import Category from "./models/category.js";
import Question from "./models/question.js";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));

async function main() {
    await mongoose.connect(MONGO_URL);
}


main().then(() => {
    console.log("Database Connected.");
}).catch((err) => {
    console.log(err)
})


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server Running!");
})


app.get("/api/categories", async (req, res) => {
    let Categories = await Category.find({});
    res.send(Categories)
})

// Assessment 
app.post("/api/assessment", async (req, res) => {
    //   console.log(req.body);
})


// Quiz Route
app.get("/api/quiz", async (req, res) => {

    let { category, questionCount } = req.query;

    questionCount = Number(questionCount);
    const questions = await Question.aggregate([
        {
            $lookup: {
                from: "categories",
                localField: "category",
                foreignField: "_id",
                as: "categoryDetails"
            }
        },
        {
            $unwind: "$categoryDetails"
        },
        {
            $match: {
                "categoryDetails.category": category
            }
        },
        {
            $sample: {
                size: questionCount
            }
        }
    ]);
    res.send(questions);
})