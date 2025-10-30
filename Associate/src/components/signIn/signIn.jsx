import React from "react";

const signIn = () => {
  return (
    <div>
      <div className="flex flex-col lg:flex-row h-screen w-full">
        <div className="sm:flex-[0.7] flex-[0.6]  bg-gradient-to-b from-sky-400 to-sky-700 rounded-br-full sm:rounded-r-full  md:rounded-bl-[50px] md:rounded-tr-[0px] lg:rounded-r-[50px] lg:rounded-l-[0px]">
          <div className="h-fit sm:h-full flex justify-center items-start mt-16 sm:mt-0 sm:items-center text-white">
            <div className="h-fit pl-10 pr-5 xl:pl-20 pb-10">
              <h1 className="text-3xl sm:text-5xl mb-4 max-w-[250px] sm:max-w-[300px]">
                Your first step <br />
                to <span className="font-bold">Success!</span>
              </h1>
              <p className="max-w-[250px] sm:max-w-[300px]">
                Education is a commitment to excellence in Teaching and Learning
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 my-auto py-4   justify-center pr-12 pl-8  sm:pr-24 sm:pl-16 w-full">
          <div className=" w-full ">
            <h1 className="mb-4 text-black/90 font-bold text-2xl">
              let's start where you let off!
            </h1>
            <hr class="border-t-2 border-black/20 w-full"></hr>
          </div>
          <div className="mt-6 flex flex-col gap-3">
            <label htmlFor="Email" className="font-medium">
              Email*
            </label>
            <input
              type="email"
              id="Email"
              placeholder="Enter Your Email"
              className="px-6 py-4 h-8 sm:h-12 rounded-sm border border-black/20"
            />
          </div>

          <div className="mt-6 flex flex-col gap-3">
            <label htmlFor="Role" className="font-medium">
              Role*
            </label>
            <select
              id="Role"
              className="px-6 sm:py-2 h-8 sm:h-12 rounded-sm border border-black/20"
              defaultValue=""
            >
              <option value="" disabled>
                Select Your Role
              </option>
              <option value="admin">Admin</option>
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </select>
          </div>

          <div className="mt-6 flex flex-col gap-3">
            <label htmlFor="Password" className="font-medium">
              Password*
            </label>
            <input
              type="password"
              id="Password"
              placeholder="Enter Your Password"
              className="px-6 py-4 h-8 sm:h-12 rounded-sm border border-black/20"
            />
          </div>

          <div className="mt-10 flex flex-col gap-3 w-fit ">
            <button className="cursor-pointer bg-gradient-to-b from-sky-400 to-sky-700 px-8 py-2 sm:px-16 sm:py-4 rounded-lg  text-white">
                SIGN IN
            </button>
          </div>
          
          <div className="mt-1 flex flex-row gap-3 w-fit  cursor-pointer">
            <p className="text-black/40 hover:underline">Don't have an account?{'   '}</p>
            <a href="/">Sign Up</a>
          </div>

          <div></div>
        </div>
      </div>
    </div>
  );
};

export default signIn;
