import express from "express";
const router = express.Router();



import quizController from "../controllers/quiz.js";

router.route("/").get(quizController.startQuiz);


export default router;