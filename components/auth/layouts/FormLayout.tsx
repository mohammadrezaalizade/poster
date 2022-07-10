import React from "react";

interface Props {
  children: JSX.Element;
}

const FormLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="w-screen h-screen flex justify-center items-center select-none">
      <div className=" hidden lg:inline-block w-full h-full relative ">
        <img
          src="/assets/images/AuthBG.jpeg"
          className="absolute object-cover w-full h-full"
          alt=""
        />
      </div>
      <div className="flex flex-col h-full w-2/3 items-center justify-center gap-10 px-16">
        <div>LOGO</div>
        {children}
      </div>
    </div>
  );
};

export default FormLayout;
