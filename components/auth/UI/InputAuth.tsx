import React, { useState, HTMLAttributes } from "react";
import { Eye, EyeSlash } from "../../../public/assets/icons/icons";
import { AnimatePresence, motion } from "framer-motion";

interface Props extends HTMLAttributes<HTMLInputElement> {
  name?: string;
  label: string;
  type: string;
  placeholder: string;
  errorMessage?: string;
  value: any;
}

const InputAuth = ({
  label,
  name,
  placeholder,
  type,
  errorMessage,
  value,
  ...rest
}: Props) => {
  const [eyeSlash, setEyeSlash] = useState(false);

  return (
    <div className="group flex flex-col min-w-full relative  ">
      <label
        htmlFor={name}
        className={`absolute translate-x-4 group-focus-within:-translate-y-7 ${
          errorMessage ? "-translate-y-7" : ""
        } transition duration-200 flex gap-2 items-center  text-p_blue-500 `}
      >
        {label}
      </label>
      {type !== "password" && (
        <>
          <input
            autoComplete="off"
            type={type}
            name={name}
            id={name}
            placeholder={placeholder}
            value={value}
            className=" w-full h-full outline-none border-2 px-4 py-2 rounded-full relative z-10 group-focus-within:border-p_blue-500 out-of-range:border-red-500"
            {...rest}
          />
          <AnimatePresence>
            {errorMessage && (
              <motion.small
                initial={false}
                animate={{
                  opacity: 1,
                  transition: {
                    delay: 0.5,
                    duration: 1.5,
                    type: "spring",
                    stiffness: 100,
                  },
                }}
                exit={{ opacity: 0 }}
                className="text-red-500 font-semibold flex items-center translate-x-5"
              >
                <span>*</span>
                <span>{errorMessage}</span>
              </motion.small>
            )}
          </AnimatePresence>
        </>
      )}
      {type === "password" && (
        <>
          <div className=" w-full h-full outline-none border-2 rounded-full  relative z-10 group-focus-within:border-p_blue-500 flex justify-between items-center pr-2">
            <input
              autoComplete="off"
              type={eyeSlash ? "text" : "password"}
              name={name}
              id={name}
              placeholder={placeholder}
              className="border-none outline-none w-full h-full py-2 px-4 rounded-full"
              {...rest}
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
          <AnimatePresence>
            {errorMessage && (
              <motion.small
                initial={false}
                animate={{
                  opacity: 1,
                  transition: {
                    delay: 0.5,
                    duration: 1.5,
                    type: "spring",
                    stiffness: 100,
                  },
                }}
                exit={{ opacity: 0 }}
                className="text-red-500 font-semibold flex items-center translate-x-5"
              >
                <span>*</span>
                <span>{errorMessage}</span>
              </motion.small>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
};

export default InputAuth;
