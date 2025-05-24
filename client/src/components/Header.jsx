import React from "react";

export default function Header() {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="text-2xl font-bold text-indigo-600">CampusReseller</div>

        <nav className="space-x-6 hidden md:flex">
          <a href="#" className="hover:text-indigo-500">Home</a>
          <a href="#" className="hover:text-indigo-500">Listings</a>
          <a href="#" className="hover:text-indigo-500">About</a>
          <a href="#" className="hover:text-indigo-500">Contact</a>
        </nav>

        <div className="space-x-4">
          <button className="px-4 py-2 border border-indigo-600 text-indigo-600 rounded hover:bg-indigo-50 transition">
            Login
          </button>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition">
            Sign Up
          </button>
        </div>
      </div>
    </header>
  );
}
