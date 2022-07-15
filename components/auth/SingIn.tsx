import React, { useState } from "react";
import InputAuth from "./UI/InputAuth";
import Link from "next/link";
import FormLayout from "./layouts/FormLayout";
import { useStore } from "zustand";
import { useAuthStore } from "../../store/global/authStore";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";

export type FormValues = {
  username: string;
  password: string;
};

export type InputType = {
  name: keyof FormValues;
  label: string;
  placeholder: string;
  type: "text" | "number" | "password" | "email";
};

const initialFormData = {
  username: "",
  password: "",
};

const SingIn = () => {
  const [keepmeSingIn, setKeepmeSingIn] = useState<boolean>(false);
  const user = useStore(useAuthStore);
  const router = useRouter();

  const SigninSchema = Yup.object().shape({
    username: Yup.string()
      .min(6, "Username must be more than 6 words")
      .max(12, "Username must be less than 12 words")
      .lowercase()
      .required("Username is required"),
    password: Yup.string()
      .min(6, "Password must be bigger than 6 words")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: initialFormData,
    onSubmit: (values: any) => {
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: values.username,
          password: values.password,
          keepmeSingIn: keepmeSingIn,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          user.singIn(data);
          console.log(data);

          //router.replace("/app");
        });
    },
    validationSchema: SigninSchema,
    validateOnChange: false,
    validateOnBlur: true,
  });

  return (
    <FormLayout>
      <form
        onSubmit={formik.handleSubmit}
        className="w-full flex flex-col gap-9 justify-center items-center"
      >
        <InputAuth
          label="Enter your username"
          placeholder="Enter your username"
          type="text"
          name="username"
          onChange={formik.handleChange}
          value={
            formik.values["username"] === null ? "" : formik.values["username"]
          }
          onBlur={formik.handleBlur}
          errorMessage={
            formik.errors["username"] && formik.touched["username"]
              ? formik.errors["username"]
              : ""
          }
        />

        <div className="flex w-full flex-col gap-2">
          <InputAuth
            label="Enter your password"
            placeholder="Enter your password"
            type="password"
            name="password"
            onChange={formik.handleChange}
            value={
              formik.values["password"] === null
                ? ""
                : formik.values["password"]
            }
            onBlur={formik.handleBlur}
            errorMessage={
              formik.errors["password"] && formik.touched["password"]
                ? formik.errors["password"]
                : ""
            }
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
