import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import "./login.scss";
import OAuth from "../OAuth/OAuth";
import Email from "../../Svgs/Email";
import Password from "../../Svgs/Password";
import MainBtn from "../../Components/Main Button/MainBtn";
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import { ClipLoader } from "react-spinners";
import { Helmet } from "react-helmet";
import { loginService } from "../../ApiServices/LoginService";
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

  // Check if credentials are saved in localStorage
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

  return (
    <div className="bg-gradient-to-r from-customBlue-mediumBlue via-customOrange-mediumOrange to-customOrange-mediumOrange min-h-screen flex items-center justify-center bg-gray-300">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Login</title>
      </Helmet>
      <div className="loginContainer w-96 lg:w-450 md:w-450 sm:w-80 xs:w-450 s:w-80 bg-white rounded-lg">
        <div className="flex justify-center">
          <img
            src="/assets/images/logo (2).png"
            alt="logo"
            className="mb-10 w-36"
          />
        </div>
        <div className="flex items-center">
          <h1 className="font-bold me-2 text-2xl">Welcome Back</h1>
          <img
            src="/assets/images/waving-hand_svgrepo.com.png"
            alt="welcome-back"
            className="w-8"
          />
        </div>
        <OAuth />
        <div className="flex items-center justify-center mt-6">
          <div className="border-t border-gray-300 flex-grow"></div>
          <span className="mx-4 text-dark font-bold text-sm">
            OR With Email
          </span>
          <div className="border-t border-gray-300 flex-grow"></div>
        </div>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <Form className="loginForm mt-5">
            <div className="relative">
              <Field
                placeholder="Email"
                className="emailInput pl-10 w-full p-3 border border-gray-300 rounded-lg"
                name="email"
              />
              <span className="absolute left-2 top-1/2 transform -translate-y-1/2">
                <Email />
              </span>
            </div>
            <div className="relative mt-5">
              <Field
                placeholder="Password"
                className="passwordInput pl-10 w-full p-3 border border-gray-300 rounded-lg"
                name="password"
                type={showPassword ? "text" : "password"}
              />
              <span className="absolute left-2 top-1/2 transform -translate-y-1/2">
                <Password />
              </span>
              <span
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FaRegEye /> : <FaEyeSlash />}
              </span>
            </div>
            {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
            <div className="flex items-center justify-between mt-5">
              <div className="flex items-center justify-between">
                <Field
                  type="checkbox"
                  className="me-2"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                <p className="text-11 lg:text-14">Remember Me</p>
              </div>
              <div
                className="font-bold text-11 lg:text-14 cursor-pointer"
                onClick={() => navigate("/ForgotPassword")}
              >
                Forget your password?
              </div>
            </div>
            <div className="mt-5">
              <MainBtn
                text={loading ? <ClipLoader color="#fff" /> : "Login"}
                btnType="submit"
                disabled={loading}
              />
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
export default AdminLogin;