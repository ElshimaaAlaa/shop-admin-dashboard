import { useState, useEffect, useCallback } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { ClipLoader } from "react-spinners";
import "./login.scss";
import OAuth from "../OAuth/OAuth";
import MainBtn from "../../Components/Main Button/MainBtn";
import { loginService } from "../../ApiServices/LoginService";
import AuthInputField from "../../Components/AuthInput Field/AuthInputField";
import PasswordInput from "../../Components/Password Input/PasswordInput";

function Login() {
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
        navigate("/Dashboard/home-dashboard");
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
      <div className="loginContainer w-[350px] p-5 lg:p-7 md:p-7  lg:w-450 md:w-450 sm:w-80 xs:w-450 s:w-80 bg-gray-50 rounded-md">
        <img
          src="/assets/svgs/vertex.svg"
          alt="logo"
          className="w-48 h-10 mb-4"
        />
        <div className="flex items-center gap-3 mt-3">
          <h1 className="font-bold text-[20px]">Welcome Back</h1>
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
          {({ errors, touched }) => (
            <Form className="loginForm mt-3">
              <AuthInputField
                name={"email"}
                placeholder={"Email"}
                error={touched.email && errors.email}
                active={touched.email}
              />
              <PasswordInput
                name={"password"}
                placeholder={"Password"}
                showPassword={showPassword}
                togglePasswordVisibility={togglePasswordVisibility}
                error={touched.password && errors.password}
                active={touched.password}
              />
              {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
              <div className="flex items-center justify-between mt-5">
                <div className="flex items-center justify-between">
                  <label className="inline-flex items-center cursor-pointer">
                    <Field
                      as="input"
                      type="checkbox"
                      name="rememberMe"
                      className="hidden peer"
                      checked={rememberMe}
                      onChange={() => setRememberMe(!rememberMe)}
                    />
                    <span className="w-4 h-4 border-2 border-gray-300 rounded flex items-center justify-center transition-all duration-200 ">
                      <svg
                        className="w-3 h-3 text-primary opacity-0 transition-all duration-200 peer-checked:opacity-100"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                      </svg>
                    </span>
                    <span className="text-11 lg:text-13 text-gray-600 ms-1">
                      Remember Me
                    </span>
                  </label>
                </div>
                <div
                  role="button"
                  tabIndex={0}
                  className="font-bold text-11 lg:text-13 cursor-pointer"
                  onClick={() => navigate("/Login/ForgotPassword")}
                >
                  Forget your password?
                </div>
              </div>
              <div className="mt-5">
                <MainBtn
                  text={
                    loading ? <ClipLoader color="#fff" size={22} /> : "Login"
                  }
                  btnType="submit"
                  disabled={loading}
                />
              </div>
            </Form>
          )}
        </Formik>
        <div className="flex items-center justify-center mt-3">
          <div className="border-t border-gray-300 flex-grow"></div>
          <span className="mx-4 text-gray-400 text-13 font-bold">OR</span>
          <div className="border-t border-gray-300 flex-grow"></div>
        </div>
        <OAuth />
        <p className="text-center text-gray-400 text-15 mt-5">
          Don’t Have An Account ?
          <span
            className="ms-1 text-primary font-bold text-16 cursor-pointer"
            onClick={() => navigate("/Register")}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}
export default Login;