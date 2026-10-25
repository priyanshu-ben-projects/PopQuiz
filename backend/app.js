import dotenv from "dotenv";
if (process.env.NODE_ENV !== "production") {
    dotenv.config();
}

import mongoose from 'mongoose';
import express from 'express';
import path from 'path';
import { fileURLToPath } from "url";
import session from "express-session";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));

const app = express();
const MONGO_URL = process.env.MONGO_URL;
import Category from "./models/category.js";
import Question from "./models/question.js";
import User from "./models/user.js";

// Session-Store
import MongoStore from "connect-mongo";


// Session Creation
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        store: MongoStore.create({ mongoUrl: process.env.MONGO_URL }),
        resave: false,
        saveUninitialized: false,
        cookie: {
            path: '/',
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 1000 * 60 * 60 * 24,
        },
    }),
);

app.use(passport.initialize());
app.use(passport.session());

// Authentication
import { Strategy as LocalStrategy } from "passport-local";
import passport from "passport";

// passport.use(new LocalStrategy(
//     function (username, password, done) {

//     }
// ));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());





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

// app.get("/session-test", (req, res) => {
//     req.session.visits = (req.session.visits || 0) + 1;

//     res.json({
//         sessionID: req.sessionID,
//         visits: req.session.visits,
//     });

// })

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