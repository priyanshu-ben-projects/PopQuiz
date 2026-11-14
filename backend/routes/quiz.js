import express from "express";
const router = express.Router();
import quizController from "../controllers/quiz.js";
import handleAsyncError from "../utils/HandleAsyncErrors.js";
import isLoggedIn from "../utils/isLoggedIn.js";


// General Quiz Routes
router.route("/").get(isLoggedIn, handleAsyncError(quizController.startQuiz));

router.route("/").post(isLoggedIn, handleAsyncError(quizController.saveResult));

router.route("/result").get(isLoggedIn, handleAsyncError(quizController.getResult));

router.route("/stats").get(isLoggedIn, handleAsyncError(quizController.getStats));

router.route("/records").get(isLoggedIn, handleAsyncError(quizController.getRecords));

router.route("/report").get(isLoggedIn, handleAsyncError(quizController.getReport));




// Admin Quiz Routes
router.route("/new").post(isLoggedIn, handleAsyncError(quizController.newQuiz));

router.route("/myquizzes").get(isLoggedIn, handleAsyncError(quizController.showQuizzes));

router.route("/:id").get(isLoggedIn, handleAsyncError(quizController.showQuizDetails));

router.route("/edit/:id").get(isLoggedIn, handleAsyncError(quizController.editQuiz));

router.route("/:id").delete(isLoggedIn, handleAsyncError(quizController.deleteQuiz));




export default router;