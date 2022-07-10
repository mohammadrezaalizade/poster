import React, { useState } from "react";
import InputAuth from "./UI/InputAuth";
import Link from "next/link";
import FormLayout from "./layouts/FormLayout";

const SingIn = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [keepmeSingIn, setKeepmeSingIn] = useState<boolean>(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (username && password) {
      fetch("", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, keepmeSingIn }),
      });
    } else {
    }
  };

  return (
    <FormLayout>
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col gap-9 justify-center items-center"
      >
        <InputAuth
          label="Username"
          type="text"
          placeholder="Your Username"
          value={username as string}
          setValue={setUsername}
          name="username"
        />
        <div className="flex w-full flex-col gap-2">
          <InputAuth
            label="Password"
            type="password"
            name="password"
            placeholder="Your Password"
            value={password as string}
            setValue={setPassword}
          />
          <div className="flex gap-2 translate-x-5 ">
            <div className="form-check">
              <input
                className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                type="checkbox"
                checked={keepmeSingIn}
                id="keepmesingIn"
                onChange={() => setKeepmeSingIn(!keepmeSingIn)}
              />
              <label
                className="form-check-label inline-block text-p_black-300 text-sm"
                htmlFor="keepmesingIn"
              >
                Keep me singIn
              </label>
            </div>
          </div>
          <Link href="/auth/forget-user-password">
            <a className="text-p_blue-500  w-max text-sm translate-x-5">
              Did you forget your password?
            </a>
          </Link>{" "}
          <Link href="/auth/sing-up">
            <a className="text-p_blue-500  w-max text-sm translate-x-5">
              Create new Poster account.
            </a>
          </Link>
        </div>
        <button
          type="submit"
          className="bg-p_blue-500 hover:bg-p_blue-400 transition duration-200 w-full py-2 px-4 rounded-full text-p_white-100 "
        >
          SingIn
        </button>
      </form>
    </FormLayout>
  );
};

export default SingIn;
