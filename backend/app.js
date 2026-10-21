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