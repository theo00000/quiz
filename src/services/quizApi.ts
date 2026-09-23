import type { Question, QuizQuestion } from "../types/quiz";

const API_URL =
    "https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple";

function decodeHTML(html: string): string {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;

    return txt.value;
}

export async function getQuestions(): Promise<QuizQuestion[]> {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error("Failed to fetch questions");
    }

    const data: { results: Question[] } = await response.json();

    return data.results.map((item) => {
        const correctAnswer = decodeHTML(item.correct_answer);

        const answers = [
            correctAnswer,
            ...item.incorrect_answers.map(decodeHTML),
        ].sort(() => Math.random() - 0.5);

        return {
            question: decodeHTML(item.question),
            answers,
            correctAnswer,
        };
    });
}