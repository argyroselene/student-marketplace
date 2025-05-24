import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-indigo-700 animated-gradient flex flex-col items-center justify-center px-6 py-12">
      <h1 className="text-white text-5xl font-extrabold mb-8 text-center drop-shadow-lg">
        Welcome to Student Marketplace
      </h1>

      <p className="text-indigo-200 mb-12 text-center max-w-lg">
        Buy, sell, and exchange with fellow students securely and easily.
      </p>

      <div className="flex space-x-6">
        <button
          onClick={() => navigate('/login')}
          className="bg-white text-indigo-700 px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-indigo-100 transition"
        >
          Login
        </button>

        <button
          onClick={() => navigate('/signup')}
          className="bg-indigo-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-indigo-500 transition"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}


