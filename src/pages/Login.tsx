import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = (username: string) => {
    localStorage.setItem("quiz_username", username);

    localStorage.removeItem("quiz_questions");
    localStorage.removeItem("quiz_progress");
    localStorage.removeItem("quiz_result");

    navigate("/quiz");
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <LoginForm onLogin={handleLogin} />
    </main>
  );
}
