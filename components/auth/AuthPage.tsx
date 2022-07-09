import React, { useEffect, useState } from "react";
import Greeting from "./Greeting";
import FirstStep from "./steps/FirstStep";
import SecondStep from "./steps/SecondStep";
import ThirdStep from "./steps/ThirdStep";
import NextBtn from "./UI/NextBtn";
import PrevBtn from "./UI/PrevBtn";

interface Step {
  component: JSX.Element;
  stepNumber: number;
}

const steps: Step[] = [
  {
    component: <FirstStep />,
    stepNumber: 0,
  },
  {
    component: <SecondStep />,
    stepNumber: 1,
  },
  {
    component: <ThirdStep />,
    stepNumber: 2,
  },
];

const AuthPage = () => {
  const [stage, setStage] = useState(0);
  const [statusNextBtn, setStatusNextBtn] = useState(false);
  const [statusPrevBtn, setStatusPrevBtn] = useState(false);

  useEffect(() => {
    if (stage <= 0) {
      return setStatusPrevBtn(true);
    } else {
      return setStatusPrevBtn(false);
    }
  }, [stage]);
  useEffect(() => {
    if (stage === steps.slice(-1)[0].stepNumber) {
      return setStatusNextBtn(true);
    } else {
      return setStatusNextBtn(false);
    }
  }, [stage]);

  return (
    <div className="w-screen h-screen lg:h-[50vh] lg:w-[50vw] lg:transform lg:translate-x-[50%] lg:translate-y-[50%] flex flex-col justify-center items-center relative">
      <div className="bg-p_white-100 w-full h-full  flex items-center justify-center flex-col">
        {steps.map((step, index) => {
          if (stage > index || stage < index) return null;
          return (
            <Greeting
              step={step.component}
              key={index}
              steps={steps}
              changeStage={setStage}
              stage={stage}
            />
          );
        })}
      </div>
      <div className="fixed flex bottom-0 p-4 justify-between w-full">
        <PrevBtn
          disabled={statusPrevBtn}
          onClick={() => {
            if (stage >= 0) {
              return setStage(stage - 1);
            } else {
              return null;
            }
          }}
        />
        <NextBtn disabled={statusNextBtn} onClick={() => setStage(stage + 1)} />
      </div>
    </div>
  );
};

export default AuthPage;
