import { useLocation, useNavigate } from "react-router-dom";
import { NotFound } from "../index";
import ResultStats from "../Components/ResultStats";
export default function ResultPage() {
  const navigate = useNavigate();
  const { state } = useLocation();

  if (!state) {
    return (
      <NotFound
        status={404}
        msg={"Complete a quiz to see your performance here."}
        notice={"No Quiz Results Found"}
      />
    );
  }

  const {
    score,
    answeredQuestions = {},
    questions = [],
    correctAnswers,
  } = state;

  return (
    <div className="max-w-3/4 mx-auto p-6 space-y-6">
      <ResultStats
        finalScore={score}
        totalAnswered={Object.keys(answeredQuestions).length}
        totalQuestions={questions.length}
        totalCorrect={correctAnswers}
      />

      {/* Questions List */}
      {questions.map((question, index) => {
        // Get answered data for this question if it exists
        const userAnswer =
          answeredQuestions[question._id] || answeredQuestions[index + 1];

        const options = userAnswer?.options || question.options || [];
        const correctAnswer =
          userAnswer?.correctAnswer || question.correctAnswer;
        const selectedOption = userAnswer?.selectedOption;
        const explanation = userAnswer?.explanation || question.explanation;

        return (
          <div
            key={question._id || index}
            className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5"
          >
            <div className="flex justify-between items-start gap-3">
              <div className="flex items-start gap-3">
                <span className="flex items-center justify-center h-8 w-8 rounded-lg bg-indigo-50 text-indigo-600 font-bold text-sm flex-shrink-0">
                  Q{index + 1}
                </span>
                <h2 className="text-lg font-semibold text-slate-800 leading-snug pt-0.5">
                  {question.question}
                </h2>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-600 rounded-full flex-shrink-0">
                {question.points || 10} pts
              </span>
            </div>

            {/* Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {options.map((option, i) => {
                // Support both object options ({label: 'B', option: '...'}) and string options
                const optLabel =
                  typeof option === "object" ? option.label : null;
                const optText =
                  typeof option === "object" ? option.option : option;

                // Flexible matching for correct and selected options
                const isCorrect =
                  (optLabel &&
                    correctAnswer &&
                    optLabel.toString().trim().toUpperCase() ===
                      correctAnswer.toString().trim().toUpperCase()) ||
                  (optText &&
                    correctAnswer &&
                    optText.toString().trim().toLowerCase() ===
                      correctAnswer.toString().trim().toLowerCase());

                const isSelected =
                  (optLabel &&
                    selectedOption &&
                    optLabel.toString().trim().toUpperCase() ===
                      selectedOption.toString().trim().toUpperCase()) ||
                  (optText &&
                    selectedOption &&
                    optText.toString().trim().toLowerCase() ===
                      selectedOption.toString().trim().toLowerCase());

                // Dynamic styling
                let optionStyle =
                  "border-slate-200 bg-slate-50/50 text-slate-700";
                if (isCorrect) {
                  optionStyle =
                    "bg-emerald-50 text-emerald-800 border-emerald-300 font-medium";
                } else if (isSelected && !isCorrect) {
                  optionStyle =
                    "bg-rose-50 text-rose-800 border-rose-300 font-medium";
                }

                return (
                  <div
                    key={i}
                    className={`flex items-center justify-between w-full px-4 py-3 rounded-lg border transition-all ${optionStyle}`}
                  >
                    <span className="text-sm">
                      {optLabel && (
                        <strong className="mr-1.5">{optLabel}.</strong>
                      )}
                      {optText}
                    </span>
                    <div className="flex items-center gap-1.5 flex-shrink-0 text-xs font-semibold">
                      {isCorrect && (
                        <span className="px-2 py-0.5 bg-emerald-200/70 text-emerald-900 rounded">
                          Correct
                        </span>
                      )}
                      {isSelected && !isCorrect && (
                        <span className="px-2 py-0.5 bg-rose-200/70 text-rose-900 rounded">
                          Your Answer
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Unanswered Notice */}
            {!userAnswer && (
              <div className="text-xs font-medium text-amber-700 bg-amber-50 p-2.5 rounded-lg border border-amber-200">
                ⚠️ You skipped this question.
              </div>
            )}

            {/* Explanation */}
            {explanation && (
              <div className="p-3.5 bg-sky-50/60 border border-sky-100 rounded-xl text-xs text-sky-900 leading-relaxed">
                <span className="font-bold">Explanation:</span> {explanation}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
