import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { LoginValidation } from "../validations/LoginValidation";
import axios from "axios";
import { GetUser, LoginRoute } from "../utils/Api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/features/userSlice";
import { useSelector } from "react-redux";
import LogoImage from "../assets/LogoImage.webp";

interface loginData {
  email: string;
  password: string;
}

const initialValues: loginData = {
  email: "",
  password: "",
};

const Loginhere = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const data = useSelector((state: any) => state.user.userData);
  const handleSubmit = async ({ email, password }: loginData) => {
    try {
      console.log("Attempting to login with:", { email, password });
      const data = await axios.post(LoginRoute, { email, password });
      if (data.data.success) {
        // console.log("Login successful, response data:", data);
        const getUser = await axios.post(`${GetUser}/${email}`);
        // console.log(
        //   "🚀 ~ file: Signup.tsx:48 ~ handleSignup ~ getUser:",
        //   getUser
        // );
        dispatch(setUserData(getUser.data.data));
      }
      Navigate("/");
    } catch (error) {
      console.error("Error while showing in login", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background-image bg-cover bg-center">
      <div className=" p-8 rounded-lg shadow-lg w-full max-w-sm">
        <div className="group flex flex-col items-center mb-4">
          <img src={LogoImage} alt="Logo" className="h-24 w-24" />
          <h1 className="text-white mt-2 text-3xl group-hover:text-violet-900">
            SpeakEasy
          </h1>
        </div>
        <h2 className="text-2xl font-bold mb-6 text-center text-white">
          Login
        </h2>
        <Formik
          initialValues={initialValues}
          validationSchema={LoginValidation}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter your email"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-xs italic"
                />
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter your password"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-xs italic"
                />
              </div>
              <div className="flex items-center justify-center">
                <button
                  type="submit"
                  className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Login
                </button>
              </div>
            </Form>
          )}
        </Formik>
        <h1
          className="flex justify-end text-white mt-4 cursor-pointer text-xl"
          onClick={() => Navigate("/signup")}
        >
          signup
        </h1>
      </div>
    </div>
  );
};

export default Loginhere;
