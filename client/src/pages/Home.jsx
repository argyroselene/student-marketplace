import { useState } from "react";

export default function Home() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

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
          onClick={() => {
            setShowSignup(false);
            setShowLogin(true);
          }}
          className="bg-white text-indigo-700 px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-indigo-100 transition"
        >
          Login
        </button>

        <button
          onClick={() => {
            setShowLogin(false);
            setShowSignup(true);
          }}
          className="bg-indigo-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-indigo-500 transition"
        >
          Sign Up
        </button>
      </div>

      {/* Login Form */}
      {showLogin && (
        <div className="mt-12 bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
          <h2 className="text-indigo-700 text-2xl font-bold mb-6">Login</h2>
          <form className="flex flex-col space-y-4">
            <input
              type="email"
              placeholder="University Email"
              className="border border-indigo-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="password"
              placeholder="Password"
              className="border border-indigo-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              className="bg-indigo-600 text-white py-3 rounded font-semibold hover:bg-indigo-500 transition"
            >
              Login
            </button>
          </form>
        </div>
      )}

      {/* Signup Form */}
{showSignup && (
  <div className="mt-12 bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
    <h2 className="text-indigo-700 text-2xl font-bold mb-6">Sign Up</h2>
    <form className="flex flex-col space-y-4">
      <input
        type="text"
        placeholder="Full Name"
        className="border border-indigo-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <input
        type="email"
        placeholder="University Email (.edu)"
        className="border border-indigo-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <input
        type="password"
        placeholder="Password"
        className="border border-indigo-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <input
        type="text"
        placeholder="University *optional"
        className="border border-indigo-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <input
        type="text"
        placeholder="Department *optional"
        className="border border-indigo-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <input
        type="text"
        placeholder="Year (e.g., Sophomore) *optional"
        className="border border-indigo-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <input
        type="date"
        placeholder="Date of Birth *optional "
        className="border border-indigo-300 rounded px-4 py-3 text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <input
        type="text"
        placeholder="Phone Number *optional "
        className="border border-indigo-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <button
        type="submit"
        className="bg-indigo-600 text-white py-3 rounded font-semibold hover:bg-indigo-500 transition"
      >
        Sign Up
      </button>
    </form>
  </div>
)}

    </div>
  );
}

