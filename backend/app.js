if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

import mongoose from 'mongoose';
import express from 'express';
import path from 'path';

const app = express();
const path = require("path");
const MONGO_URL = 'mongodb://localhost:27017/popQuiz';


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


app.get("/", (req, res) => {
    res.send("The Backend is Running!")
})