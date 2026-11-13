import Question from "../models/question.js";
import Result from "../models/result.js";
import Category from "../models/category.js";
import Quiz from "../models/quiz.js";
// General Quiz Routes
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
    const { _id } = req.user;
    const { answeredQuestions, duration, isCompleted, score, questions, correctAnswers } = req.body.data;

    const result = await Result.create({
        user: _id,
        score,
        answeredQuestions,
        questions,
        correctAnswers,
        isCompleted,
        duration,
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

        const categoryData = await Category.findById(categoryID);

        return ({

            _id: e._id,
            title: e.title,
            category: categoryData.category,
            score: e.score,
            date: new Date(e.createdAt).toLocaleDateString('en-GB'),
            status: e.isCompleted ? "completed" : "incomplete",
            participants: null,

        })


    }));

    res.status(200).json({
        success: true,
        records: data,
    })
}

const getReport = async (req, res, next) => {

    const { recordID } = req.query;

    const getResult = await Result.findById(recordID);


    const { _id, user, title, score, correctAnswers, createdAt, duration, answeredQuestions, isCompleted, questions } = getResult;
    const keys = Object.keys(answeredQuestions);

    res.status(200).json({
        report: {
            _id: _id,
            user: user,
            title: title,
            score: score,
            correctAnswers: correctAnswers,
            isCompleted: isCompleted,
            totalQuestions: questions.length,
            incorrectAnswers: questions.length - keys.length,
            date: new Date(createdAt).toLocaleDateString("en-US"),
            duration,
        }
    })

}

// Admin Quiz Routes
const newQuiz = async (req, res, next) => {

    const {
        title,
        description,
        category,
        syllabus,
        totalQuestions,
        pointsPerQuestion,
        negativeMarks,
        difficulty,
        timerEnabled,
        duration,
        scheduleEnabled,
        startTime,
        startDate,
        endDate,
        endTime,
        rules,
        instructions,
        maximumMarks,
        status
    } = req.body;

    const newQuiz = await Quiz.create({
        title,
        description,
        category,
        syllabus,
        totalQuestions,
        pointsPerQuestion,
        negativeMarks,
        difficulty,
        timerEnabled,
        duration,
        scheduleEnabled,
        startTime,
        startDate,
        endDate,
        endTime,
        rules,
        instructions,
        maximumMarks,
        status
    });

    console.log(newQuiz)

    res.status(200).json({
        success: true,
        msg: "Quiz Created successfully"
    });

}

const editQuiz = async (req, res, next) => {

}


const deleteQuiz = async (req, res, next) => {

}

const showQuizzes = async (req, res, next) => {

    const quizzes = await Quiz.find({});
    const formattedQuizzes = quizzes.map((e) => ({
        id: e._id,
        title: e.title,
        description: e.description,
        category: e.category,
        questions: e.totalQuestions,
        duration: e.duration,
        createdAt: e.createdAt,
        status: e.status,
    }));



    res.status(200).json({ formattedQuizzes })
}




export default { newQuiz, editQuiz, deleteQuiz, showQuizzes, getStats, getReport, startQuiz, saveResult, getResult, getRecords };