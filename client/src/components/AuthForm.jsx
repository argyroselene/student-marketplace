export default function AuthForm({ type }) {
  return (
    <form className="flex flex-col space-y-4">
      {type === "signup" && (
        <input
          type="text"
          placeholder="Full Name"
          className="border border-indigo-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      )}
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
        {type === "login" ? "Login" : "Sign Up"}
      </button>
    </form>
  );
}
