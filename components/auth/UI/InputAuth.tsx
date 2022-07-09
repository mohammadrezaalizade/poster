import React, { useState } from "react";
import { Eye, EyeSlash } from "../../../public/assets/icons/icons";
import { AnimatePresence } from "framer-motion";
interface Props {
  name: string;
  label: string;
  type: string;
  placeholder: string;
  value: string;
  setValue: Function;
  others?:any;
}

const InputAuth: React.FC<Props> = ({
  label,
  name,
  placeholder,
  type,
  value,
  setValue,
  others
}) => {
  const [eyeSlash, setEyeSlash] = useState(false);

  return (
    <div className="group flex flex-col min-w-full relative  ">
      <label
        htmlFor={name}
        className="absolute translate-x-4 group-focus-within:-translate-y-7 text-p_blue-500 transition duration-200"
      >
        {label}
      </label>

      {type !== "password" && (
        <input
          autoComplete="off"
          type={type}
          name={name}
          id={name}
          placeholder={placeholder}
          min={type !== "password" ? 5 : 6}
          className=" w-full h-full outline-none border-2 px-4 py-2 rounded-full relative z-10 group-focus-within:border-p_blue-500 out-of-range:border-red-500"
          value={value}
          onChange={(e: any) => setValue(e.target.value)}
          {...others}
        />
      )}
      {type === "password" && (
        <div className=" w-full h-full outline-none border-2 rounded-full  relative z-10 group-focus-within:border-p_blue-500 flex justify-between items-center pr-2">
          <input
            autoComplete="off"
            type={eyeSlash ? "text" : "password"}
            name={name}
            id={name}
            placeholder={placeholder}
            className="border-none outline-none w-full h-full py-2 px-4 rounded-full"
            min={6}
            max={12}
            value={value}
            onChange={(e: any) => setValue(e.target.value)}
          />
          <AnimatePresence>
            {eyeSlash === false && (
              <Eye
                onClick={() => setEyeSlash(true)}
                className="stroke-p_black-300 hover:stroke-p_blue-400 cursor-pointer transition duration-200"
              />
            )}
            {eyeSlash && (
              <EyeSlash
                onClick={() => setEyeSlash(false)}
                className="stroke-p_black-300 hover:stroke-p_blue-400 cursor-pointer transition duration-200"
              />
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default InputAuth;
