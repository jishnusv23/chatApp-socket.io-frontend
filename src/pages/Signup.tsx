import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { SignUpValidation } from "../validations/Singupvalidation";
import axios from "axios";
import { GetUser, SignupRoute } from "../utils/Api";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/features/userSlice";
import { useNavigate } from "react-router-dom";
import LogoImage from "../assets/LogoImage.webp";

interface SignupData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const initialValues: SignupData = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSignup = async (values: SignupData) => {
    console.log("working");
    const { name, email, password, confirmPassword } = values;

    console.log(
      name,
      email,
      password,
      confirmPassword,
      "-------------------------------"
    );

    try {
      const response = await axios.post(SignupRoute, {
        name,
        email,
        password,
      });

      console.log("Signup response:", response.data.data);
      if (response.data.success) {
        dispatch(setUserData(response.data.data));
        navigate("/setAvatar");
      } else {
        console.log("first-else");
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background-image bg-cover bg-center">
      <div className=" p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="group flex flex-col items-center mb-4">
          <img src={LogoImage} alt="Logo" className="h-24 w-24" />
          <h1 className="text-white mt-2 text-3xl group-hover:text-violet-900">
            SpeakEasy
          </h1>
        </div>
        <h2 className="text-2xl font-bold mb-6 text-center text-white">
          Sign Up
        </h2>
        <Formik
          initialValues={initialValues}
          validationSchema={SignUpValidation}
          onSubmit={handleSignup}
        >
          <Form className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <Field
                type="text"
                id="name"
                name="name"
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <Field
                type="email"
                id="email"
                name="email"
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <Field
                type="password"
                id="password"
                name="password"
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <Field
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-black hover:bg-blue-600 text-white font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Sign Up
              </button>
            </div>
          </Form>
        </Formik>
        <div className="flex justify-end mt-4">
          <h1
            className="text-white  hover:text-blue-600 cursor-pointer text-xl"
            onClick={() => navigate("/login")}
          >
            Login
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Signup;
