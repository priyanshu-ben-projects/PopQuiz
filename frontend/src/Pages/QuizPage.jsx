import { useEffect, useState, useContext } from "react";
import { QuestionCard } from "../index";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Loader2 } from "lucide-react";

function QuizPage() {
  const [q, setq] = useState([]);
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get("api/quiz", {
        params: location.state,
      })
      .then((Response) => {
        setq(Response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      {loading ? (
        <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-sky-500" />

          <p className="text-sm font-medium text-slate-500 animate-pulse">
            Preparing your assessment...
          </p>
        </div>
      ) : q.length > 0 ? (
        <QuestionCard duration={location.state.duration} questions={q} />
      ) : (
        <p className="text-center text-slate-500 py-20">
          No questions available.
        </p>
      )}
    </>
  );
}

export default QuizPage;
