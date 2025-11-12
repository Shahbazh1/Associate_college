import React from "react";
import { useNavigate } from "react-router-dom";
import college_img from "../assets/college.webp"; // ✅ correct path since assets and components are siblings

const Welcome = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/signin"); // ✅ goes to SignIn page
  };

  return (
    <div
      className="w-full h-screen bg-cover bg-center flex flex-col justify-center items-center text-white"
      style={{
        backgroundImage: `url(${college_img})`,
      }}
    >
      {/* Overlay to make text visible */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="relative z-10 text-center px-6">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
          Welcome to College Connect 🎓
        </h1>
        <p className="text-lg md:text-2xl mb-8 font-medium text-gray-200">
          Let's get started and explore your academic world!
        </p>

        <button
          onClick={handleStart}
          className="px-8 py-3 bg-gradient-to-r from-blue-500 to-green-400 text-white font-semibold text-lg rounded-full shadow-lg hover:scale-105 transition-all duration-300"
        >
          Let’s Start →
        </button>
      </div>
    </div>
  );
};

export default Welcome;
