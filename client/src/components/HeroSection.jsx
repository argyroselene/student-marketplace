import React from "react";

export default function HeroSection() {
  return (
    <section className="bg-indigo-50 min-h-[70vh] flex flex-col justify-center items-center text-center px-4">
      <h1 className="text-4xl md:text-6xl font-extrabold text-indigo-700 mb-6">
        Welcome to CampusReseller
      </h1>
      <p className="text-lg md:text-xl max-w-2xl mb-8 text-indigo-600">
        The ultimate marketplace just for students. Buy, sell, and connect with your campus community.
      </p>
      <div className="space-x-4">
        <button className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
          Get Started
        </button>
        <button className="px-8 py-3 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition">
          Learn More
        </button>
      </div>
    </section>
  );
}
