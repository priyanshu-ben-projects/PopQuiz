import express from "express";
const router = express.Router();
import quizController from "../controllers/quiz.js";
import handleAsyncError from "../utils/HandleAsyncErrors.js";
import isLoggedIn from "../utils/isLoggedIn.js";


router.route("/").get(isLoggedIn, handleAsyncError(quizController.startQuiz));


router.route("/").post(isLoggedIn, handleAsyncError(quizController.saveResult));

router.route("/result").get(isLoggedIn, handleAsyncError(quizController.getResult));




export default router;