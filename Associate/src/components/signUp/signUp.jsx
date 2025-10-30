import React, { useState } from "react";
import college_img from "../../assets/college.webp";

const SignUp = () => {
  const [user, setUser] = useState("Student");

  return (
    <div>
      <div className="flex flex-row-reverse h-screen w-full rounded-4xl">
        <div className="flex-1">
          <img
            src={college_img}
            alt="college_img"
            className="object-cover h-screen"
          />
        </div>
        <div className="flex-[0.7] flex flex-col p-6 pr-8">
          <div className="flex flex-col">
            <ul className="flex flex-row gap-6 text-sky-600 font-semibold self-end">
              <li
                onClick={() => setUser("Student")}
                className="relative cursor-pointer after:content-[''] after:block after:w-0 after:h-0.5 after:bg-green-500 after:transition-all after:duration-300 hover:after:w-full"
              >
                Student
              </li>
              <li
                onClick={() => setUser("Admin")}
                className="relative cursor-pointer after:content-[''] after:block after:w-0 after:h-0.5 after:bg-green-500 after:transition-all after:duration-300 hover:after:w-full"
              >
                Admin
              </li>
              <li
                onClick={() => setUser("Faculty")}
                className="relative cursor-pointer after:content-[''] after:block after:w-0 after:h-0.5 after:bg-green-500 after:transition-all after:duration-300 hover:after:w-full"
              >
                Faculty
              </li>
            </ul>
          </div>

          <div className="flex-1 mt-7 flex flex-col justify-start items-start gap-6">
            <div className="self-center">
              <h1 className="font-bold text-2xl mb-2">{user} Login</h1>
              <hr className="w-full bg-green-500 h-0.5 text-green-500" />
            </div>

            <div className="text-black/30 w-full">
              <div className="mb-2">
                <label htmlFor="fullName" className="text-black/80">
                  Full Name
                </label>
                <input
                  id="fullName"
                  type="text"
                  className="h-10 w-full border rounded-sm px-2"
                />
              </div>

              <div className="mb-2">
                <label htmlFor="email" className="text-black/80">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  className="h-10 w-full border rounded-sm px-2"
                />
              </div>

              <div className="mb-2">
                <label htmlFor="userId" className="text-black/80">
                  {user} ID
                </label>
                <input
                  id="userId"
                  type="text"
                  className="h-10 w-full border rounded-sm px-2"
                />
              </div>

              <div className="mb-10">
                <label htmlFor="password" className="text-black/80">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  className="h-10 w-full border rounded-sm px-2"
                />
              </div>

              <div className="mb-2 flex justify-center">
                <button className="bg-sky-600 text-slate-100 px-24 py-3 rounded-sm">
                  Register
                </button>
              </div>
              <div className="mt-1 flex w-full justify-center flex-row  gap-3  cursor-pointer">
                <p className="text-black/40 ">Don't have an account?</p>
                <a
                  href="/signUp"
                  className="text-sky-600 hover:underline font-semibold"
                >
                  Sign Up
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
