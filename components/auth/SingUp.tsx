import React, { useEffect, useState } from "react";
import FormLayout from "./layouts/FormLayout";
import InputAuth from "./UI/InputAuth";

const SingUp = () => {
  const [newUsername, setNewUsername] = useState("");
  const [avaibleUsername, setAvaibleUsername] = useState(true);
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmnewPassword, setConfirmnewPassword] = useState("");

  //check username is exists or not
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (newUsername.length >= 4) {
        //ERROR
        fetch(`${process.env.BASE_URL}/api/user.....`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ newPassword }),
        })
          .then((res) => res.json())
          .then((isAvaible) =>
            isAvaible ? setAvaibleUsername(true) : setAvaibleUsername(false)
          );
      }
    }, 2000);

    return clearTimeout(timeout);
  }, [newUsername]);

  const handlesubmit = (e: any) => {
    e.preventDefault();
    if (
      newUsername &&
      newUsername.length >= 6 &&
      avaibleUsername &&
      email &&
      email.length > 8 &&
      email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/) &&
      newPassword &&
      newPassword.length >= 8 &&
      confirmnewPassword &&
      confirmnewPassword.length >= 8 &&
      confirmnewPassword.length === newPassword.length &&
      confirmnewPassword === newPassword
    ) {
      console.log({
        newUsername,
        email,
        newPassword,
        confirmnewPassword,
      });
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
          setValue={setNewUsername}
          type="text"
          value={newUsername}
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
          setValue={setNewPassword}
          type="password"
          value={newPassword}
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
