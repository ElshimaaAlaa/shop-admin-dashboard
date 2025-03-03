import React, { useState, useEffect, useCallback } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { ClipLoader } from "react-spinners";
import "./login.scss";
import OAuth from "../OAuth/OAuth";
import Email from "../../Svgs/Email";
import MainBtn from "../../Components/Main Button/MainBtn";
import { loginService } from "../../ApiServices/LoginService";
import InputField from "../../Components/Input Field/InputField";
import PasswordInput from "../../Components/Password Input/PasswordInput";

function AdminLogin() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const savedEmail = localStorage.getItem("Email");
    const savedPassword = localStorage.getItem("password");
    if (savedEmail && savedPassword) {
      setInitialValues({ email: savedEmail, password: savedPassword });
      setRememberMe(true);
    }
  }, []);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters long")
      .required("Password is required"),
  });

  const handleSubmit = async (values) => {
    setLoading(true);
    setError(null);
    try {
      await loginService(values.email, values.password);
      console.log("Logged in successfully");
      if (rememberMe) {
        localStorage.setItem("password", values.password);
      } else {
        localStorage.removeItem("password");
      }
      setTimeout(() => {
        navigate("/Home");
      }, 1500);
    } catch (error) {
      console.error(error);
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  return (
    <div className="main-container">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Login</title>
      </Helmet>
      <div className="loginContainer w-96 lg:w-450 md:w-450 sm:w-80 xs:w-450 s:w-80 bg-white rounded-md">
        <div className="flex">
          <img
            src="/assets/svgs/vertex.svg"
            alt="logo"
            className="w-44 mb-5"
          />
        </div>
        <div className="flex items-center">
          <h1 className="font-bold me-3 text-2xl">Welcome Back</h1>
          <img
            src="/assets/images/waving-hand_svgrepo.com.png"
            alt="welcome-back"
            className="w-8"
          />
        </div>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <Form className="loginForm mt-8">
            <InputField name={"email"} placeholder={"Email"} icon={Email} />
            <PasswordInput
              name={"password"}
              placeholder={"Password"}
              showPassword={showPassword}
              togglePasswordVisibility={togglePasswordVisibility}
            />
            {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
            <div className="flex items-center justify-between mt-5">
              <div className="flex items-center justify-between">
                <Field
                  type="checkbox"
                  name="rememberMe"
                  className="me-2 w-4 h-4"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                <p className="text-11 lg:text-14 text-gray-600">Remember Me</p>
              </div>
              <div
                role="button"
                tabIndex={0}
                className="font-bold text-11 lg:text-13 cursor-pointer"
                onClick={() => navigate("/ForgotPassword")}
              >
                Forget your password?
              </div>
            </div>
            <div className="mt-5">
              <MainBtn
                text={loading ? <ClipLoader color="#fff" size={20} /> : "Login"}
                btnType="submit"
                disabled={loading}
              />
            </div>
          </Form>
        </Formik>
        <div className="flex items-center justify-center mt-8">
          <div className="border-t border-gray-300 flex-grow"></div>
          <span className="mx-4 text-gray-400 text-14 text-sm">OR</span>
          <div className="border-t border-gray-300 flex-grow"></div>
        </div>
        <OAuth />
      </div>
    </div>
  );
}
export default AdminLogin;