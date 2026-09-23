interface QuizHeaderProps {
  username: string;
  currentQuestion: number;
  totalQuestions: number;
}

export default function QuizHeader({
  username,
  currentQuestion,
  totalQuestions,
}: QuizHeaderProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm text-gray-500">Welcome,</p>

        <h2 className="text-xl font-bold text-gray-800">{username}</h2>
      </div>

      <div className="rounded-lg bg-blue-50 px-4 py-2">
        <p className="text-sm font-semibold text-blue-600">
          Question {currentQuestion} of {totalQuestions}
        </p>
      </div>
    </div>
  );
}
