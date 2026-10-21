

import data from "./data.js";


import mongoose from "mongoose";
import Category from "../models/category.js";
import Question from "../models/question.js";

const MONGO_URL = 'mongodb://localhost:27017/popQuiz';

main().then(() => {
    console.log("DB Connected!")
}).catch((err) => {
    console.log(err)
})


async function main() {
    mongoose.connect(MONGO_URL);
}





const initDB = async () => {

    // await Category.deleteMany({});
    // await Category.insertMany(data.categoryData);

    await Question.deleteMany({});

    const categories = await Category.find({});

    const categoryMap = new Map(
        categories.map((category) => [
            category.category,
            category._id,
        ])
    );

    const questions = data.questionData.map((question) => ({
        ...question,
        category: categoryMap.get(question.category),
    }));


    await Question.insertMany(questions);

    console.log("Avengers! Akraman!");
}

initDB();
