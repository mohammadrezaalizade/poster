import React, { useEffect, useState } from "react";
import FormLayout from "./layouts/FormLayout";
import InputAuth from "./UI/InputAuth";
import { userToken as userInfo } from "../../atoms/userToken";
import { useRecoilState } from "recoil";
import jwt from "jsonwebtoken";

const KEY = process.env.NEXT_PUBLIC_JWT_KEY as string;

const SingUp = () => {
  const [username, setUsername] = useState("");
  const [avaibleUsername, setAvaibleUsername] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmnewPassword, setConfirmnewPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [userToken, setUserToken] = useRecoilState(userInfo);

  
  //check username is exists or not
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (username.length >= 4) {
        //ERROR
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user.....`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password }),
        })
          .then((res) => res.json())
          .then((isAvaible) =>
            isAvaible ? setAvaibleUsername(true) : setAvaibleUsername(false)
          );
      }
    }, 2000);

    return clearTimeout(timeout);
  }, [username]);

  const handlesubmit = (e: any) => {
    e.preventDefault();
    if (
      username &&
      username.length >= 6 &&
      avaibleUsername &&
      email &&
      email.length > 8 &&
      email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/) &&
      password &&
      password.length >= 8 &&
      confirmnewPassword &&
      confirmnewPassword.length >= 8 &&
      confirmnewPassword.length === password.length &&
      confirmnewPassword === password
    ) {
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/newuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
          email: email,
          fullName: fullName,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setUserToken(data.token);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <FormLayout>
      <form
        onSubmit={handlesubmit}
        className="w-full flex flex-col gap-9 justify-center items-center"
      >
        <InputAuth
          label="New username"
          name="newusername"
          placeholder="New username"
          setValue={setUsername}
          type="text"
          value={username}
        />
        <InputAuth
          label="Your full name"
          name="userfullname"
          placeholder="Your full name"
          setValue={setFullName}
          type="text"
          value={fullName}
        />
        <InputAuth
          label="Your E-mail"
          name="email"
          placeholder="Your E-mail"
          setValue={setEmail}
          type="text"
          value={email}
        />
        <InputAuth
          label="Your Password"
          name="newpassword"
          placeholder="Your password"
          setValue={setPassword}
          type="password"
          value={password}
        />
        <InputAuth
          label="Confirm your password"
          name="confirmnewpassword"
          placeholder="Confirm your password"
          setValue={setConfirmnewPassword}
          type="password"
          value={confirmnewPassword}
        />
        <button
          type="submit"
          className="bg-p_blue-500 hover:bg-p_blue-400 transition duration-200 w-full py-2 px-4 rounded-full text-p_white-100 "
        >
          SingUp
        </button>
      </form>
    </FormLayout>
  );
};

export default SingUp;
