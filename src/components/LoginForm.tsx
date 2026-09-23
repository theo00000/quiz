import { useState, type FormEvent } from "react";

interface LoginFormProps {
  onLogin: (username: string) => void;
}

export default function LoginForm({ onLogin }: LoginFormProps) {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedUsername = username.trim();

    if (!trimmedUsername) {
      setError("Nama tidak boleh kosong.");
      return;
    }

    setError("");
    onLogin(trimmedUsername);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg"
    >
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-gray-800">Quiz App</h1>

        <p className="mt-2 text-sm text-gray-500">
          Masukkan nama kamu untuk memulai kuis.
        </p>
      </div>

      <div className="mb-5">
        <label
          htmlFor="username"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Nama
        </label>

        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Contoh: Wesly"
          className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />

        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700"
      >
        Mulai Quiz
      </button>
    </form>
  );
}
