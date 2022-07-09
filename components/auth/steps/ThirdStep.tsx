import React from "react";
import Link from "next/link";
const ThirdStep = () => {
  return (
    <div className=" h-full flex flex-col items-center justify-center select-none p-16  gap-6">
      <h1 className="text-blue-500 text-3xl cursor-pointer transition-all duration-200 animate-bounce font-semibold">
        Poster
      </h1>
      <div className=" w-full flex items-center justify-center flex-col gap-8">
        <Link href="/auth/sing-in">
          <a className="bg-p_blue-500 hover:bg-p_blue-400 transition duration-200 w-full lg:w-1/2 p-2 rounded-full text-p_white-100 text-lg text-center">
            SingIn
          </a>
        </Link>
        <div className="flex flex-col">
          <p className="text-p_black-300 text-">
            Already you don't have poster account? {" "}
            <Link href="/auth/sing-up">
              <a className="text-p_blue-500 border-b border-p_blue-500">SingUp</a>
            </Link>
          </p>
          <a></a>
        </div>
      </div>
    </div>
  );
};

export default ThirdStep;
