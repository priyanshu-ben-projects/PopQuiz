
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

import mongoose from "mongoose";
import Quiz from "./quiz.js";

const sampleQuizzes = [
    {
        title: "JavaScript Fundamentals",
        description: "Test your understanding of core JavaScript concepts, syntax, and programming fundamentals.",
        category: "JavaScript",
        syllabus: "Variables, Data Types, Operators, Functions, Arrays, Objects, Loops, Conditions, Scope, Hoisting",
        totalQuestions: 10,
        pointsPerQuestion: 1,
        negativeMarking: false,
        negativeMarks: 0,
        difficulty: "Easy",
        timerEnabled: true,
        duration: 15,
        scheduleEnabled: false,
        rules: "Attempt all questions. Each question carries 1 mark. No negative marking.",
        instructions: "Read each question carefully before selecting an answer.",
        maximumMarks: 10,
        status: "Published",
    },
    {
        title: "React Essentials",
        description: "Evaluate your knowledge of React fundamentals and commonly used hooks.",
        category: "React",
        syllabus: "JSX, Components, Props, State, useState, useEffect, useContext, Events, Conditional Rendering, React Router",
        totalQuestions: 10,
        pointsPerQuestion: 2,
        negativeMarking: true,
        negativeMarks: 0.5,
        difficulty: "Medium",
        timerEnabled: true,
        duration: 20,
        scheduleEnabled: false,
        rules: "Correct answer: +2 marks. Incorrect answer: -0.5 marks.",
        instructions: "Choose the most appropriate answer for every question.",
        maximumMarks: 20,
        status: "Published",
    },
    {
        title: "Node.js & Express Development",
        description: "A practical assessment covering backend development using Node.js and Express.",
        category: "Node.js",
        syllabus: "Node.js, Modules, npm, Express, Middleware, Routing, REST APIs, HTTP Methods, Error Handling, Authentication",
        totalQuestions: 10,
        pointsPerQuestion: 2,
        negativeMarking: false,
        negativeMarks: 0,
        difficulty: "Medium",
        timerEnabled: true,
        duration: 25,
        scheduleEnabled: false,
        rules: "Each correct answer awards 2 marks. There is no negative marking.",
        instructions: "Complete the assessment within the given time.",
        maximumMarks: 20,
        status: "Draft",
    },
    {
        title: "MongoDB Database Basics",
        description: "Check your understanding of MongoDB, collections, documents, and database operations.",
        category: "MongoDB",
        syllabus: "NoSQL, Documents, Collections, CRUD, Queries, Operators, Aggregation, Relationships, Mongoose, Schema",
        totalQuestions: 10,
        pointsPerQuestion: 1,
        negativeMarking: true,
        negativeMarks: 0.25,
        difficulty: "Easy",
        timerEnabled: false,
        duration: 0,
        scheduleEnabled: false,
        rules: "Correct answer: +1 mark. Incorrect answer: -0.25 marks.",
        instructions: "There is no time limit for this assessment.",
        maximumMarks: 10,
        status: "Completed",
    },
    {
        title: "Full Stack Development Challenge",
        description: "An advanced assessment covering frontend, backend, APIs, databases, and web application architecture.",
        category: "Full Stack Development",
        syllabus: "HTML, CSS, JavaScript, React, Node.js, Express, MongoDB, REST APIs, Authentication, Deployment",
        totalQuestions: 10,
        pointsPerQuestion: 3,
        negativeMarking: true,
        negativeMarks: 1,
        difficulty: "Hard",
        timerEnabled: true,
        duration: 30,
        scheduleEnabled: false,
        rules: "Correct answer: +3 marks. Incorrect answer: -1 mark. Unanswered questions carry 0 marks.",
        instructions: "This is an advanced assessment. Manage your time carefully.",
        maximumMarks: 30,
        status: "Archived",
    },
];

async function seedQuizzes() {
    try {
        await mongoose.connect(process.env.MONGO_URL);

        const insertedQuizzes = await Quiz.insertMany(sampleQuizzes);

        console.log(`${insertedQuizzes.length} quizzes inserted successfully!`);
    } catch (error) {
        console.error("Quiz seeding failed:", error);
    }
}

seedQuizzes();
