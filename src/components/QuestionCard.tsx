interface QuestionCardProps {
  question: string;
  answers: string[];
  onAnswer: (answer: string) => void;
  disabled?: boolean;
}

export default function QuestionCard({
  question,
  answers,
  onAnswer,
  disabled = false,
}: QuestionCardProps) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-md">
      <h2 className="mb-6 text-xl font-semibold leading-relaxed text-gray-800">
        {question}
      </h2>

      <div className="space-y-3">
        {answers.map((answer, index) => (
          <button
            key={`${answer}-${index}`}
            type="button"
            disabled={disabled}
            onClick={() => onAnswer(answer)}
            className="
              w-full rounded-xl border border-gray-200
              px-5 py-4 text-left font-medium text-gray-700
              transition
              hover:border-blue-500 hover:bg-blue-50 hover:text-blue-700
              disabled:cursor-not-allowed disabled:opacity-50
            "
          >
            {answer}
          </button>
        ))}
      </div>
    </div>
  );
}
