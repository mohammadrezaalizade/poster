import React, { useState } from "react";

const SecondStep = () => {
  const [intro, _] = useState(["P", "o", "s", "t", "e", "r"]);
  return (
    <div className="h-full flex items-center justify-center select-none">
      <div className="flex justify-center flex-col items-center p-16 gap-4">
        <h1 className="text-2xl font-semibold text-p_black-400 flex gap-1">
          What is{" "}
          <span className="flex border-b-2 border-transparent hover:border-p_blue-500 cursor-pointer transition-all duration-200 animate-bounce">
            {intro.map((words, index) => (
              // Add Wave animation
              <span
                className="text-p_blue-500"
                key={index}
              >
                {words}
              </span>
            ))}
          </span>{" "}
          ?
        </h1>
        <p className="text-center">
          The Poster is a community designed for photographers and who love
          sharing their photos.
        </p>
        <p className="font-light text-xs text-p_blue-400">
          If you are interested press Next.
        </p>
      </div>
    </div>
  );
};

export default SecondStep;
