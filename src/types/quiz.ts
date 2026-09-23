export interface Question {
    type: string;
    difficulty: string;
    category: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
}

export interface QuizQuestion {
    question: string;
    answers: string[];
    correctAnswer: string;
}

export interface QuizProgress {
    currentQuestion: number;
    selectedAnswers: Record<number, string>;
    correctAnswers: number;
    timeRemaining: number;
}

export interface QuizResult {
    correctAnswers: number;
    wrongAnswers: number;
    answeredQuestions: number;
    totalQuestions: number;
}