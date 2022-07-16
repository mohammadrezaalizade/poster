import React from "react";
import FormLayout from "./layouts/FormLayout";
import InputAuth from "./UI/InputAuth";
import { useStore } from "zustand";
import { useAuthStore } from "../../store/global/authStore";
import { useFormik } from "formik";
import * as Yup from "yup";
import { tostify } from "../UI/notification/utils/tostify";


export type FormValues = {
  username: string;
  fullname: string;
  email: string;
  password: string;
  confirmPassword: string;
};
export type InputType = {
  name: keyof FormValues;
  label: string;
  placeholder: string;
  type: "text" | "number" | "password" | "email";
};
const formInputs: InputType[] = [
  {
    name: "username",
    label: "Enter a new username",
    placeholder: "Enter a new username",
    type: "text",
  },

  {
    name: "fullname",
    label: "Enter your full name",
    placeholder: "Enter your full name",
    type: "text",
  },
  {
    name: "email",
    label: "Enter your E-mail",
    placeholder: "Enter your E-mail",
    type: "text",
  },
  {
    name: "password",
    label: "Enter your passowrd",
    placeholder: "Enter your passowrd",
    type: "password",
  },
  {
    name: "confirmPassword",
    label: "Confirm your password",
    placeholder: "Confirm your password",
    type: "password",
  },
];

/* 
========Initial form data
*/
const initialFormData = {
  username: "",
  fullname: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SingUp = () => {
  const user = useStore(useAuthStore);

  const SignupSchema = Yup.object().shape({
    username: Yup.string()
      .min(6, "Username must be more than 6 words")
      .max(12, "Username must be less than 12 words")
      .lowercase()
      .required("Username is required"),
    fullname: Yup.string().required("Fullname is required"),
    email: Yup.string()
      .matches(
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        "Please Enter a valid E-mail"
      )
      .required("E-mail is required"),

    password: Yup.string()
      .min(6, "Password must be bigger than 6 words")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf(
        [Yup.ref("password"), null],
        "Confirm password must be equal password"
      )
      .min(6, "Confirm password must be bigger than 6 words")
      .required("Confirm password is required"),
  });

  const formik = useFormik({
    initialValues: initialFormData,
    onSubmit: (values: any) => {
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/newuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: values.username,
          password: values.password,
          email: values.email,
          fullName: values.fullName,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          user.singIn(data);
          console.log(data);
          if (data.error) {
            tostify(`${data.error}`, "error");
          }
        })
        .catch((error) => {
          tostify(`${error.error}`, "error");
        });
    },
    validationSchema: SignupSchema,
    validateOnChange: false,
    validateOnBlur: true,
  });

  return (
    <FormLayout>
      <form
        onSubmit={formik.handleSubmit}
        className="w-full flex flex-col gap-9 justify-center items-center"
      >
        {formInputs.map((input: InputType, index) => (
          <InputAuth
            key={index}
            label={input.label}
            placeholder={input.placeholder}
            type={input.type}
            name={input.name}
            onChange={formik.handleChange}
            value={
              formik.values[input.name] === null
                ? ""
                : formik.values[input.name]
            }
            onBlur={formik.handleBlur}
            errorMessage={
              formik.errors[input.name] && formik.touched[input.name]
                ? formik.errors[input.name]
                : ""
            }
          />
        ))}
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
