import React from "react";
import { motion, LayoutGroup } from "framer-motion";

interface Props {
  step: JSX.Element;
  steps: any[];
  changeStage: Function;
  stage: number;
}

const Greeting: React.FC<Props> = ({ step, steps, changeStage, stage }) => {
  return (
    <div className="relative">
      <motion.div
        className="w-screen h-screen relative"
        initial={{
          x: "-100vw",
          opacity:0
        }}
        animate={{
          x:0,
          opacity:1,
          transition:{
            delay:0.5,
            stiffness:100
          }
        }}
      >
        <div className="h-full w-full">{step}</div>
      </motion.div>
      <div className=" translate-y-[50px] fixed bottom-1/4 left-0 right-0 flex justify-center items-center">
        <div className="flex gap-1">
          <LayoutGroup key="helperdotes" id="helperdotes">
            {steps.map((step, index) => (
              <div
                className={`w-2 h-2 border-2  ${
                  stage === index
                    ? "bg-p_blue-500 border-transparent"
                    : "bg-p_white-100 border-p_blue-500"
                } cursor-pointer  rounded-full`}
                onClick={() => changeStage(index)}
                key={index}
              />
            ))}
          </LayoutGroup>
        </div>
      </div>
    </div>
  );
};

export default Greeting;
