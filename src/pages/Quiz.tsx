import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ProgressBar from "../components/ProgressBar";
import QuestionCard from "../components/QuestionCard";
import QuizHeader from "../components/QuizHeader";
import Timer from "../components/Timer";

import { getQuestions } from "../services/quizApi";

import type { QuizProgress, QuizQuestion, QuizResult } from "../types/quiz";

const TOTAL_QUESTIONS = 10;
const QUIZ_DURATION = 600;

export default function Quiz() {
  const navigate = useNavigate();

  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [username, setUsername] = useState("");

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<number, string>
  >({});

  const [correctAnswers, setCorrectAnswers] = useState(0);

  const [timeRemaining, setTimeRemaining] = useState(QUIZ_DURATION);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const savedUsername = localStorage.getItem("quiz_username");

    if (!savedUsername) {
      navigate("/");
      return;
    }

    setUsername(savedUsername);

    const savedQuestions = localStorage.getItem("quiz_questions");

    const savedProgress = localStorage.getItem("quiz_progress");

    if (savedQuestions && savedProgress) {
      try {
        const parsedQuestions: QuizQuestion[] = JSON.parse(savedQuestions);

        const parsedProgress: QuizProgress = JSON.parse(savedProgress);

        setQuestions(parsedQuestions);

        setCurrentQuestion(parsedProgress.currentQuestion);

        setSelectedAnswers(parsedProgress.selectedAnswers);

        setCorrectAnswers(parsedProgress.correctAnswers);

        setTimeRemaining(parsedProgress.timeRemaining);

        setLoading(false);

        return;
      } catch {
        localStorage.removeItem("quiz_questions");
        localStorage.removeItem("quiz_progress");
      }
    }

    loadQuestions();
  }, [navigate]);

  const loadQuestions = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getQuestions();

      setQuestions(data);

      localStorage.setItem("quiz_questions", JSON.stringify(data));
    } catch (err) {
      console.error(err);

      setError("Gagal mengambil soal. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loading || questions.length === 0 || isFinished) {
      return;
    }

    if (timeRemaining <= 0) {
      finishQuiz();
      return;
    }

    const timer = setInterval(() => {
      setTimeRemaining((previousTime) => {
        if (previousTime <= 1) {
          clearInterval(timer);

          return 0;
        }

        return previousTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [loading, questions.length, isFinished, timeRemaining]);

  useEffect(() => {
    if (loading || questions.length === 0 || isFinished) {
      return;
    }

    const progress: QuizProgress = {
      currentQuestion,
      selectedAnswers,
      correctAnswers,
      timeRemaining,
    };

    localStorage.setItem("quiz_progress", JSON.stringify(progress));
  }, [
    currentQuestion,
    selectedAnswers,
    correctAnswers,
    timeRemaining,
    loading,
    questions.length,
    isFinished,
  ]);

  const handleAnswer = (answer: string) => {
    if (isFinished) return;

    const question = questions[currentQuestion];

    if (!question) return;

    const isCorrect = answer === question.correctAnswer;

    const newSelectedAnswers = {
      ...selectedAnswers,
      [currentQuestion]: answer,
    };

    const newCorrectAnswers = isCorrect ? correctAnswers + 1 : correctAnswers;

    setSelectedAnswers(newSelectedAnswers);
    setCorrectAnswers(newCorrectAnswers);

    const isLastQuestion = currentQuestion === questions.length - 1;

    if (isLastQuestion) {
      finishQuiz(newSelectedAnswers, newCorrectAnswers);

      return;
    }

    setCurrentQuestion((prev) => prev + 1);
  };

  const finishQuiz = (
    finalAnswers = selectedAnswers,
    finalCorrectAnswers = correctAnswers,
  ) => {
    if (isFinished) return;

    setIsFinished(true);

    const answeredQuestions = Object.keys(finalAnswers).length;

    const wrongAnswers = answeredQuestions - finalCorrectAnswers;

    const result: QuizResult = {
      correctAnswers: finalCorrectAnswers,
      wrongAnswers,
      answeredQuestions,
      totalQuestions: questions.length,
    };

    localStorage.setItem("quiz_result", JSON.stringify(result));

    localStorage.removeItem("quiz_progress");

    navigate("/result");
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-100">
        <p className="text-lg font-medium text-gray-600">
          Loading questions...
        </p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
        <div className="rounded-xl bg-white p-8 text-center shadow">
          <p className="mb-5 text-red-500">{error}</p>

          <button
            onClick={loadQuestions}
            className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white"
          >
            Coba Lagi
          </button>
        </div>
      </main>
    );
  }

  const question = questions[currentQuestion];

  if (!question) {
    return null;
  }

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 rounded-2xl bg-white p-6 shadow-sm">
          <QuizHeader
            username={username}
            currentQuestion={currentQuestion + 1}
            totalQuestions={questions.length}
          />

          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex-1">
              <ProgressBar
                current={Object.keys(selectedAnswers).length}
                total={questions.length}
              />
            </div>

            <Timer timeRemaining={timeRemaining} />
          </div>
        </div>

        <QuestionCard
          question={question.question}
          answers={question.answers}
          onAnswer={handleAnswer}
          disabled={isFinished}
        />
      </div>
    </main>
  );
}
