import Question from "../models/question.js";
import Result from "../models/result.js";
import Category from "../models/category.js";

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
    const { answeredQuestions, isCompleted, score, questions, correctAnswers } = req.body.data;

    const result = await Result.create({
        user: _id,
        score,
        answeredQuestions,
        questions,
        correctAnswers,
        isCompleted,
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

    const getAverageScore = await Result.aggregate([
        { $match: { user: _id } },
        {
            $group: {
                _id: "$user",
                average: { $avg: "$score" }
            }
        }
    ])

    const averageScore = getAverageScore.length > 0 ? getAverageScore[0].average : 0;

    const totalCompleted = await Result.countDocuments({ isCompleted: true });
    const completetionRate = totalCompleted > 0 ? ((totalCompleted / quizData.length) * 100) : 0;

    const stats = {
        quizzesAttempted: quizData.length,
        averageScore: Math.floor(averageScore),
        bestScore: bestScore.length > 0 ? bestScore[0].score : 0,
        completionRate: Math.floor(completetionRate),
    };

    res.status(200).json({ stats });
}

const getRecords = async (req, res, next) => {

    const { _id } = req.user;
    const results = await Result.find({ user: _id });

    const data = await Promise.all(results.map(async (e, i) => {

        const categoryID = e.questions[0].category;
        const categoryData = await Category.find({ _id: categoryID });

        return ({
            _id: `${i + 1}`,
            title: e.title,
            category: categoryData[0].category,
            score: e.score,
            date: new Date(e.createdAt).toLocaleDateString('en-GB'),
            status: e.isCompleted ? "completed" : "incomplete",
            participants: null,
        })


    }));

    res.status(200).json({
        success: true,
        records: data
    })
}



export default { getStats, startQuiz, saveResult, getResult, getRecords };