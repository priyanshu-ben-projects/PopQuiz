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



export default { startQuiz, saveResult, getResult };