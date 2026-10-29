import Question from "../models/question.js";
import Result from "../models/result.js";

const startQuiz = async (req, res, next) => {

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

}


const saveResult = async (req, res, next) => {

    if (!req.user) {
        res.status(500).json({
            success: false,
            msg: "User Must Be Logged In."
        });
    }
    const { _id } = req.user;
    const { answeredQuestions, score, questions, correctAnswers } = req.body.data;

    const result = await Result.create({
        user: _id,
        score,
        answeredQuestions,
        questions,
        correctAnswers,
    });

    res.status(200).json({
        success: true,
        msg: "result successfully saved"
    });

}

const getResult = async (req, res, next) => {

    const result = await Result.findOne({
        user: req.user._id,
    }).sort({ createdAt: -1 });


    res.send(result);

}

const getStats = async (req, res, next) => {

    if (!req.isAuthenticated()) {
        res.status(500).json({
            success: false,
            msg: "user must be logged in"
        });
    }

    const { _id, accountType } = req.user;

    const quizData = await Result.find({ user: _id });
    const bestScore = await Result.find({ user: _id }).sort({ score: -1 }).limit(1);

    const stats = {
        quizzesAttempted: quizData.length,
        averageScore: 78,
        bestScore: bestScore[0].score,
        completionRate: 92,
    };

    console.log(stats)


    console.log(quizData.length);


    res.status(200).json({
        success: true,
        msg: "Aye Haye Oye Hoye Aye Haye Oye Hoye"
    });
}


export default { getStats, startQuiz, saveResult, getResult };