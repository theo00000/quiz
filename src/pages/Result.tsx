import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ResultCard from "../components/ResultCard";

import type { QuizResult } from "../types/quiz";

export default function Result() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");

  const [result, setResult] = useState<QuizResult | null>(null);

  useEffect(() => {
    const savedUsername = localStorage.getItem("quiz_username");

    const savedResult = localStorage.getItem("quiz_result");

    if (!savedUsername || !savedResult) {
      navigate("/");
      return;
    }

    setUsername(savedUsername);

    try {
      const parsedResult: QuizResult = JSON.parse(savedResult);

      setResult(parsedResult);
    } catch {
      navigate("/");
    }
  }, [navigate]);

  const handleRestart = () => {
    localStorage.removeItem("quiz_questions");

    localStorage.removeItem("quiz_progress");

    localStorage.removeItem("quiz_result");

    navigate("/quiz");
  };

  if (!result) {
    return null;
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <ResultCard
        username={username}
        correctAnswers={result.correctAnswers}
        wrongAnswers={result.wrongAnswers}
        answeredQuestions={result.answeredQuestions}
        totalQuestions={result.totalQuestions}
        onRestart={handleRestart}
      />
    </main>
  );
}
