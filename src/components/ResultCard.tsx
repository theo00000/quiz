interface ResultCardProps {
  username: string;
  correctAnswers: number;
  wrongAnswers: number;
  answeredQuestions: number;
  totalQuestions: number;
  onRestart: () => void;
}

export default function ResultCard({
  username,
  correctAnswers,
  wrongAnswers,
  answeredQuestions,
  totalQuestions,
  onRestart,
}: ResultCardProps) {
  const score =
    totalQuestions > 0
      ? Math.round((correctAnswers / totalQuestions) * 100)
      : 0;

  return (
    <div className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-lg">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800">Quiz Completed 🎉</h1>

        <p className="mt-2 text-gray-500">Good job, {username}!</p>
      </div>

      <div className="mb-8 text-center">
        <p className="text-sm font-medium text-gray-500">Your Score</p>

        <p className="mt-2 text-5xl font-bold text-blue-600">{score}</p>

        <p className="mt-1 text-gray-400">out of 100</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <ResultItem label="Benar" value={correctAnswers} />

        <ResultItem label="Salah" value={wrongAnswers} />

        <ResultItem label="Dijawab" value={answeredQuestions} />

        <ResultItem label="Total Soal" value={totalQuestions} />
      </div>

      <button
        type="button"
        onClick={onRestart}
        className="mt-8 w-full rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
      >
        Coba Lagi
      </button>
    </div>
  );
}

interface ResultItemProps {
  label: string;
  value: number;
}

function ResultItem({ label, value }: ResultItemProps) {
  return (
    <div className="rounded-xl bg-gray-50 p-4 text-center">
      <p className="text-2xl font-bold text-gray-800">{value}</p>

      <p className="mt-1 text-sm text-gray-500">{label}</p>
    </div>
  );
}
