import dotenv from "dotenv";
if (process.env.NODE_ENV !== "production") {
    dotenv.config();
}

import mongoose from 'mongoose';
import express from 'express';
import path from 'path';
import { fileURLToPath } from "url";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";

// Models & Routers
import Category from "./models/category.js";
import User from "./models/user.js";
import userRouter from "./routes/user.js";
import quizRouter from "./routes/quiz.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const MONGO_URL = process.env.MONGO_URL;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));

// Passport Setup
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Database Connection
async function main() {
    await mongoose.connect(MONGO_URL);
}

main().then(() => {
    console.log("Database Connected.");
}).catch((err) => {
    console.log(err);
});

// Session Store
const store = MongoStore.create({
    mongoUrl: MONGO_URL,
    crypto: {
        secret: process.env.SESSION_SECRET
    }
});

store.on("error", (err) => {
    console.log("ERROR IN MONGO SESSION STORE", err);
});

const sessionData = {
    store,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24,
    },
};

app.use(session(sessionData));
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.get("/api/categories", async (req, res) => {
    let Categories = await Category.find({});
    res.send(Categories);
});

app.get("/", (req, res) => {
    res.send("Ab main aese jita hu jaise mera divorce ho chuka hai!!");
});

app.post("/api/assessment", async (req, res) => {
    // Assessment logic
});

app.use("/api/user", userRouter);
app.use("/api/quiz", quizRouter);

export default app;