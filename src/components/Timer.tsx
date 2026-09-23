interface TimerProps {
  timeRemaining: number;
}

export default function Timer({ timeRemaining }: TimerProps) {
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  const formattedTime = `${String(minutes).padStart(
    2,
    "0",
  )}:${String(seconds).padStart(2, "0")}`;

  const isWarning = timeRemaining <= 60;

  return (
    <div
      className={`flex items-center justify-center rounded-lg px-4 py-2 font-bold ${
        isWarning ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-700"
      }`}
    >
      <span className="mr-2">⏱</span>

      <span>{formattedTime}</span>
    </div>
  );
}
